import type { screenSizes } from '@/tailwind.config'

export const storyblokImage = (
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

export const ratioDimensions = (
  ratio: Luca.TAspectRatios | string | number,
): Luca.ImageDimensions => {
  const parts = ratio.toString().split(':').map((num: string): number => Number(num))

  return {
    width: parts[0],
    height: parts[1],
  }
}

const generateSrcsetEntry = (src: string, width: number): string => {
  return `${src} ${width}w`
}

export const generateSrcset = (
  assetUrl: string,
  transformationParams: Luca.ImageTransformOptions,
  widths: number[],
): string => {
  return widths
    .map(width =>
      generateSrcsetEntry(storyblokImage(assetUrl, { ...transformationParams, width }), width),
    )
    .join(', ')
}

export const generateSizes = (
  sizesObject: any,
) => {
  if (!sizes || !srcset) return undefined

  /**
   * WHY: This is here to sort array of sizes keys.
   * [1345, 347, 220, md, xl, sm, default] is converted to all numbers
   * and sorted into descending order
   * [1345, 1280 (xl), 768 (md), 640 (sm), 347, 220, 0 (default)]
   */
  const sortedOrderSizes = Object.keys(sizes).sort((first, next) => {
    const sizes: any = {}
    const convertToNumber = (value: any, variable: any) => {
      if (value === 'default') {
        sizes[variable] = 0
        return
      }

      // The value will either be 'sm' or '350' for example.
      // Convert both types of values into a number.
      sizes[variable] = !isNaN(value)
        ? parseInt(value)
        : screenSizes[value]
    }

    convertToNumber(first, 'first')
    convertToNumber(next, 'next')

    return sizes.next - sizes.first
  })

  /**
   * WHY: This is here to format the sorted
   * order of sizes into the correct sizes syntax
   *
   * { md: '100vw' } --> (min-width: 1440px) 100vw,
   * or
   * { 200: '50vw' } --> (min-width: 200px) 50vw,
   * or
   * default: 'calc(100vw - gutters)' --> calc(100vw - gutters)
   */

  const formattedSizes = sortedOrderSizes.reduce((acc, size, index, arr) => {
    const screenSizesSize = screenSizesObject[size] || size

    if (!screenSizesSize && size !== 'default') return acc

    const sizeKey
      = size === 'default' ? '' : `(min-width: ${screenSizesSize}px) `

    const sizeValue
      = arr.length === index + 1 ? `${sizes[size]}` : `${sizes[size]}, `

    return `${acc}${sizeKey}${sizeValue}`
  }, '')

  return formattedSizes.trim()
}

export const setMedia = (media: 'landscape' | 'portrait' | typeof screenSizes) => {
  if (typeof media === 'number') return `(min-width: ${media}px)`

  return `(orientation: ${media})`
}
