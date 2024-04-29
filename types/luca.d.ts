declare namespace Luca {
  type TAspectRatios =
    'auto'
    | '16:9'
    | '9:16'
    | '8:9'
    | '3:2'
    | '2:3'
    | '4:3'
    | '3:4'
    | '1:1.414'
    | '1:1'

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

  export type Theme = {
    background: string
    text: string
  }
}
