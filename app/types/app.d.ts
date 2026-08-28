declare namespace Luca {
  type TAspectRatios
    = 'auto'
      | '16:10'
      | '10:16'
      | '16:9'
      | '9:16'
      | '5:4'
      | '4:5'
      | '4:3'
      | '3:4'
      | '3:2'
      | '2:3'
      | '1:1'

  export interface ImageDimensions {
    width: number
    height: number
  }

  export interface ImageTransformOptions {
    width: number
    height: number
    smart?: boolean
    quality?: number
    blur?: number
  }

  export interface Theme {
    background: string
    text: string
  }
}
