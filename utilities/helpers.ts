import type { LocationQuery } from 'vue-router'

const isStoryblokEditor = (search: LocationQuery) => '_storyblok' in search

const randomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const storyblokSlug = (path: string): string =>
  ['/', ''].includes(path) ? '/home' : path.replace(/\/+$/, '')

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const nl2br = (input: string): string => input.replace(/\n/g, '<br>')

const sleep = async (ms: number): Promise<void> =>
  new Promise<void>(resolve => setTimeout(resolve, ms))

const requestDelay = async <T>(promise: T, ms: number = 1000) => {
  const [p] = await Promise.all([promise, sleep(ms)])

  return p
}

const hasRichTextContent = (richtext: any): boolean => {
  return Boolean(richtext?.content?.[0]?.content?.length)
}

export {
  isStoryblokEditor,
  randomNumberInRange,
  storyblokSlug,
  wait,
  nl2br,
  sleep,
  requestDelay,
  hasRichTextContent,
}
