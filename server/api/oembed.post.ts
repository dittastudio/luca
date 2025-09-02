import jsdom from 'jsdom'

interface Options {
  autoplay?: number
  loop?: number
  muted?: number
  autopause?: number
}

interface Fields {
  url: string
  params?: Options
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

export default defineEventHandler(async (event) => {
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

  const body = await readBody(event) as Fields | undefined

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No payload data found',
    })
  }

  const { url, params } = body

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No URL found in payload',
    })
  }

  const requestUrl = new URL(url)

  if (!requestUrl.hostname) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid URL as no hostname was found',
    })
  }

  const serviceUrl = platforms[requestUrl.hostname as keyof typeof platforms]

  if (!serviceUrl) {
    const services = Object.keys(platforms).map(item => item.replace('www.', ''))
    const uniques = [...new Set(services)]
    const formatter = new Intl.ListFormat('en', {
      style: 'long',
      type: 'disjunction',
    })
    const list = formatter.format(uniques)

    throw createError({
      statusCode: 400,
      statusMessage: `Unsupported platform. Should be one of: ${list}`,
    })
  }

  const request = await fetch(`${serviceUrl}?format=json&url=${url}`, {
    method: 'get',
  })

  const data = await request.json() as OembedResponse
  const dom = new jsdom.JSDOM(data.html)
  const iframe: HTMLIFrameElement | null = dom.window.document.querySelector('iframe')

  if (!iframe) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No iframe found in the HTML',
    })
  }

  const src = iframe.getAttribute('src')

  if (!src) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No src attribute found in the iframe',
    })
  }

  const srcUrl = new URL(src)

  if (params && typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      srcUrl.searchParams.append(key, String(value))
    }
  }

  iframe.setAttribute('src', srcUrl.toString())

  const payload = {
    ...data,
    html: dom.window.document.body.innerHTML,
  }

  return {
    ...payload,
  }
})
