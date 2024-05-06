import { screenSizes } from '@/tailwind.config'

export interface gridColSpanOptions {
  breakpoint: keyof typeof screenSizes | number
  columnSpan: number
  totalColumns: number
}

export const gridColSpan = ({ breakpoint, columnSpan, totalColumns }: gridColSpanOptions) => {
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
