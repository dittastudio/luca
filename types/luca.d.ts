declare namespace Luca {
  export type ImageDimensions = {
    width: number
    height: number
  }

  export type ImageTransformOptions = {
    width: number
    height: number
    smart?: boolean
    quality?: number
    blur?: number
  }
}
