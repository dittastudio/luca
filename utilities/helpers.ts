import type { LocationQuery } from 'vue-router'
import { deburr } from 'lodash-es'
import type { RichtextStoryblok } from '@/types/storyblok'

const isStoryblokEditor = (search: LocationQuery) => '_storyblok' in search

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp']
const videoExtensions = ['mp4', 'webm', 'ogg']

const storyblokAssetType = (filename: string): 'image' | 'video' | 'other' => {
  if (typeof filename !== 'string' || !filename?.trim().length) return 'other'

  const ext = filename.split('.').pop() || ''

  if (imageExtensions.includes(ext)) return 'image'
  if (videoExtensions.includes(ext)) return 'video'

  return 'other'
}

const storyblokSlug = (path: string): string =>
  ['/', ''].includes(path) ? '/home' : path.replace(/\/+$/, '')

const storyblokImageDimensions = (
  filename: string | null | undefined,
): { width: number, height: number } => {
  if (!filename?.length) {
    return {
      width: 0,
      height: 0,
    }
  }

  const [width, height] = filename.split('/')[5].split('x')

  return { width: Number(width), height: Number(height) }
}

const storyblokImage = (
  filename: string | null | undefined,
  options?: Luca.ImageTransformOptions | undefined,
): string => {
  if (!filename?.length) return ''

  const settings: Luca.ImageTransformOptions = {
    width: 0,
    height: 0,
    smart: false,
    quality: 90,
    blur: 0,
    ...options,
  }

  const filterProperties: Record<string, string> = {
    blur: settings.blur && settings.blur > 0 ? `:blur(${settings.blur})` : '',
    quality: `:quality(${settings.quality})`,
  }

  const filters: string = Object.values(filterProperties)
    .map(item => item.trim())
    .filter(item => item.length)
    .join('')

  const transforms = `m/${settings.width}x${settings.height}${
    settings.smart ? '/smart' : ''
  }/filters${filters}`
  const path = `${filename}/${transforms}`.replace('//a.storyblok.com', '//a2.storyblok.com')

  return path
}

const ratioDimensions = (
  ratio: Luca.TAspectRatios | string | number,
): Luca.ImageDimensions => {
  const parts = ratio.toString().split(':').map((num: string): number => Number(num))

  return {
    width: parts[0],
    height: parts[1],
  }
}

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const requestDelay = async <T>(promise: T, ms: number = 1000) => {
  const [p] = await Promise.all([promise, wait(ms)])

  return p
}

const hasRichTextContent = (richtext: RichtextStoryblok | undefined): boolean => Boolean(richtext?.content?.[0]?.content?.length)

const safeKebabCase = (str: string) =>
  deburr(str)
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .trim()

const objectToUrlParams = (obj: Record<string, any>) => {
  const params = new URLSearchParams()

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      params.append(key, obj[key])
    }
  }

  return params.toString()
}

const arrayToTuples = (imageArray: any) => {
  const tuples = []

  for (let i = 0; i < imageArray.length; i += 2) {
    if (i + 1 < imageArray.length) {
      tuples.push([imageArray[i], imageArray[i + 1]])
    }
    else {
      tuples.push([imageArray[i]])
    }
  }

  return tuples
}

export {
  hasRichTextContent,
  isStoryblokEditor,
  objectToUrlParams,
  ratioDimensions,
  requestDelay,
  safeKebabCase,
  arrayToTuples,
  storyblokAssetType,
  storyblokImage,
  storyblokImageDimensions,
  storyblokSlug,
  wait,
}
