export const IMAGE_TRANSFORM_URL = 'https://yco-serverless.netlify.app/images'

export function generateTransformParamsString({
  f = 'auto',
  q = '70',
  c = 'fill',
  ...transformationParams
}: TransformParamTypes): string {
  return Object.entries({ f, q, c, ...transformationParams })
    .map(([key, value]) => `${key}_${value}`)
    .join(',')
}

export function getAssetFilepathWithTransforms(
  path: string = '',
  transformsStr: string = '',
): string {
  const splitValue = '/upload/'
  if (!path?.includes(splitValue)) return path

  const [firstPt = '', secondPt = ''] = path.split(splitValue)
  const transformPt = transformsStr ? `${transformsStr}/` : ''

  return `${firstPt}${splitValue}${transformPt}${secondPt}`
}

export function removeOriginHostFromAssetUrl(assetUrl: string): string {
  try {
    const { pathname } = new URL(assetUrl)
    return pathname
  }
  catch (error) {
    console.warn('Error parsing asset url', error)
    return assetUrl
  }
}

export const getRatio = (ratio: keyof AspectRatioInterface) => {
  const ar = ASPECT_RATIO_MAP[ratio]
  const [ratioWidth, ratioHeight] = ar.split(':')

  return {
    width: ratioWidth,
    height: ratioHeight,
    ar,
  }
}

export const isStaticUrl = (url: string) =>
  url ? !url.includes('https') : false

export function generateSrc(
  assetUrl: string,
  transformationParams: TransformParamTypes,
  width: number,
): string {
  const assetFilePath = removeOriginHostFromAssetUrl(assetUrl)
  const transformsStr = generateTransformParamsString({
    ...transformationParams,
    w: width,
  })

  return getAssetFilepathWithTransforms(assetFilePath, transformsStr)
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

export function calculateTransformationParams(
  providedWidth: string | number,
  providedHeight: string | number | undefined,
  ratio?: keyof AspectRatioInterface,
): {
    width: string | number
    height: string | number | undefined
    transformationParams: TransformParamTypes
  } {
  let width: string | number = providedWidth
  let height: string | number | undefined = providedHeight
  const transformationParams: TransformParamTypes = {}

  if (ratio && ASPECT_RATIO_MAP[ratio]) {
    const aspectRatio = getRatio(ratio)
    width = aspectRatio.width
    height = aspectRatio.height
    transformationParams.ar = aspectRatio.ar
  }

  return { width, height, transformationParams }
}

export function parseMediaObject(media: ImageType | VideoType): (
  | ImageType
  | VideoType
) & {
  isImage: boolean
  isVideo: boolean
  isValidImage: boolean
} {
  const invalidImageFormats = ['svg']

  const { format, resource_type } = media

  const isImage = !!(resource_type && resource_type === 'image')

  return {
    ...media,
    isImage,
    isValidImage: !!(
      isImage
      && format
      && !invalidImageFormats.includes(format)
    ),
    isVideo: !!(resource_type && resource_type === 'video'),
  }
}
