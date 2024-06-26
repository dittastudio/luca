import jsdom from 'jsdom'
import type { HandlerEvent } from '@netlify/functions'

interface Fields {
  url: string
  params: Record<string, string>
}

interface OembedResponse {
  author_name: string
  author_url: string
  cache_age: number
  embed: string
  height: number
  html: string
  image: string
  provider_name: string
  provider_url: string
  title: string
  type: string
  url: string
  version: string
  width: string
}

export const handler = async (event: HandlerEvent) => {
  const platforms = {
    'soundcloud.com': 'https://soundcloud.com/oembed',
    'www.soundcloud.com': 'https://soundcloud.com/oembed',
    'mixcloud.com': 'https://app.mixcloud.com/oembed',
    'www.mixcloud.com': 'https://app.mixcloud.com/oembed',
    'vimeo.com': 'https://vimeo.com/api/oembed.json',
    'www.vimeo.com': 'https://vimeo.com/api/oembed.json',
    'youtube.com': 'https://youtube.com/oembed',
    'www.youtube.com': 'https://youtube.com/oembed',
  }

  const { url, params } = JSON.parse(event.body ?? '{}') as Fields

  try {
    const requestUrl = new URL(url)

    if (!requestUrl.hostname) {
      throw new Error('Invalid URL as no hostname was found')
    }

    const serviceUrl = platforms[requestUrl.hostname as keyof typeof platforms]

    if (!serviceUrl) {
      throw new Error('Unsupported platform')
    }

    const request = await fetch(`${serviceUrl}?format=json&url=${url}`, {
      method: 'get',
    })

    const data = await request.json() as OembedResponse
    const dom = new jsdom.JSDOM(data.html)
    const iframe: HTMLIFrameElement | null = dom.window.document.querySelector('iframe')

    if (!iframe) {
      throw new Error('No iframe found in the HTML')
    }

    const src = iframe.getAttribute('src')

    if (!src) {
      throw new Error('No src attribute found in the iframe')
    }

    const srcUrl = new URL(src)

    for (const [key, value] of Object.entries(params)) {
      srcUrl.searchParams.append(key, String(value))
    }

    iframe.setAttribute('src', srcUrl.toString())

    const newData = {
      ...data,
      html: dom.window.document.body.innerHTML,
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: newData,
        error: false,
      }),
    }
  }
  catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        data: null,
        error: true,
      }),
    }
  }
}
