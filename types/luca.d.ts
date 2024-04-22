declare namespace Luca {
  type TAspectRatios = 'auto' | '3:2' | '2:3' | '4:3' | '3:4' | '16:9' | '9:16'

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
