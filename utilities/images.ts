import { screenSizes } from '@/tailwind.config'
import { storyblokImage } from '@/utilities/storyblok'

interface gridColSpanOptions {
  breakpoint: keyof typeof screenSizes | number
  columnSpan: number
  totalColumns: number
}

const gridColSpan = ({ breakpoint, columnSpan, totalColumns }: gridColSpanOptions) => {
  const breakpointNumber: number = (typeof breakpoint === 'number') ? breakpoint : screenSizes[breakpoint]

  const innerGutter = 20
  let outerGutter

  if (breakpointNumber >= screenSizes['2xl'] && breakpointNumber < screenSizes['3xl']) {
    outerGutter = 60
  }
  else if (breakpointNumber >= screenSizes.md && breakpointNumber < screenSizes['2xl']) {
    outerGutter = 40
  }
  else {
    outerGutter = 20
  }

  const totalGutters = (outerGutter * 2) + (innerGutter * (totalColumns - 1))

  if (breakpointNumber >= screenSizes['3xl']) {
    return `calc((((${screenSizes['3xl']}px - ${totalGutters}px) / ${totalColumns}) * ${columnSpan}) + (${columnSpan - 1} * ${innerGutter}px))`
  }
  else if (columnSpan === totalColumns) {
    return `calc(100vw - ${outerGutter * 2}px)`
  }

  return `calc((((100vw - ${totalGutters}px) / ${totalColumns}) * ${columnSpan}) + (${columnSpan - 1} * ${innerGutter}px))`
}

export const calculateHeight = (imageWidth: number, imageHeight: number, chosenWidth: number) => {
  return Math.round((imageHeight / imageWidth) * chosenWidth)
}

export const setSizes = (sizes: any) => {
  if (!sizes)
    return

  // Sort sizes keys in descending order based on screen size
  const sortedOrderSizes = Object.keys(sizes).sort((a, b) => {
    const sizeA = screenSizes[a] || Number.parseInt(a) || 0
    const sizeB = screenSizes[b] || Number.parseInt(b) || 0
    return sizeB - sizeA
  })

  // Format the sorted sizes into correct syntax
  const formattedSizes = sortedOrderSizes
    .map((size: any) => {
      // console.log(size)
      const screenSizesSize = screenSizes[size] || Number.parseInt(size) || 0
      if (screenSizesSize === 0 && size !== 'zero')
        return ''

      const sizeKey = size === 'zero' ? '' : `(min-width: ${screenSizesSize}px) `
      const sizeScreen = sizes[size]
      let sizeValue

      console.log('sizeScreen', sizeScreen)

      if (typeof sizeScreen === 'object') {
        sizeValue = gridColSpan({
          breakpoint: sizeScreen?.breakpoint,
          columnSpan: Number(sizeScreen?.columnSpan),
          totalColumns: Number(sizeScreen?.totalColumns) | 12,
        })
      }

      console.log('sizeValue', sizeValue)

      return `${sizeKey}${sizeValue}`
    })

  return formattedSizes.join(', ')
}

export const setBlurryPlaceholder = (src: string, imageWidth: number, imageHeight: number, chosenWidth: number) => {
  return storyblokImage(src, { width: chosenWidth, height: calculateHeight(imageWidth, imageHeight, chosenWidth), blur: 3 })
}
