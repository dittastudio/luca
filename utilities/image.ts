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

function generateSrcsetEntry(src: string, width: number): string {
  return `${src} ${width}w`
}

export function generateImageSrc(
  assetUrl: string,
  transformationParams: TransformParamTypes,
  width: number,
): string {
  if (isStaticUrl(assetUrl)) return assetUrl

  const url = generateSrc(assetUrl, transformationParams, width)

  return `${IMAGE_TRANSFORM_URL}${url}`
}

export function generateImageSrcset(
  assetUrl: string,
  transformationParams: TransformParamTypes,
  widths: number[],
): string {
  return widths
    .map(width =>
      generateSrcsetEntry(
        generateImageSrc(assetUrl, transformationParams, width),
        width,
      ),
    )
    .join(', ')
}
