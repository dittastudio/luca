import type { Config } from 'tailwindcss'

const pixelsToRemsUnit = (pixels: number): number => pixels / 16

interface ClampOptions {
  minPixels: number
  minViewportWidthPixels: number
  maxPixels: number
  maxViewportWidthPixels: number
}

const clamp = ({
  minPixels,
  minViewportWidthPixels,
  maxPixels,
  maxViewportWidthPixels,
}: ClampOptions) => {
  const minValueRems = pixelsToRemsUnit(minPixels)
  const maxValueRems = pixelsToRemsUnit(maxPixels)
  const minViewportWidthRems = pixelsToRemsUnit(minViewportWidthPixels)
  const maxViewportWidthRems = pixelsToRemsUnit(maxViewportWidthPixels)
  const slope = (maxValueRems - minValueRems) / (maxViewportWidthRems - minViewportWidthRems)
  const intercept = minValueRems - slope * minViewportWidthRems

  return `clamp(${minValueRems}rem, ${intercept}rem + ${slope * 100}vw, ${maxValueRems}rem)`
}

export const screenSizes = {
  'zero': 1,
  'xs': 375,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1200,
  '2xl': 1440,
  '3xl': 1920,
}

export const colours = {
  white: 'rgb(255 255 255 / <alpha-value>)',
  whiteHex: '#ffffff',
  black: 'rgb(0 0 0 / <alpha-value>)',
  blackHex: '#000000',
  offwhite: 'rgb(233 231 231 / <alpha-value>)',
  offwhiteHex: '#E9E7E7',
  mint: 'rgb(213 220 205 / <alpha-value>)',
  mintHex: '#D5DCCD',
  green: 'rgb(45 63 47 / <alpha-value>)',
  greenHex: '#2D3F2F',
  olive: 'rgb(92 95 66 / <alpha-value>)',
  oliveHex: '#5C5F42',
  brown: 'rgb(56 51 27 / <alpha-value>)',
  brownHex: '#38331B',
}

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './utilities/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    colors: {
      ...colours,
    },
    spacing: {
      0: '0',
      5: '5px',
      8: '8px',
      10: '10px',
      15: '15px',
      20: '20px',
      30: '30px',
      32: '32px',
      40: '40px',
      50: '50px',
      60: '60px',
      70: '70px',
      80: '80px',
      90: '90px',
      100: '100px',
      120: '120px',
      150: '150px',
      300: '300px',
    },
    fontFamily: {
      body: [
        'Magister',
        'Iowan Old Style',
        'Palatino Linotype',
        'URW Palladio L',
        'serif',
        'system-ui',
      ],
      heading: ['Sebenta', 'Rockwell', 'system-ui'],
    },
    fontSize: {
      '10': '0.625rem',
      '12': '0.75rem',
      '14': '0.875rem',
      '16': '1rem',
      '18': '1.125rem',
      '20': '1.25rem',
      '24': '1.5rem',
      '32': '2rem',
      '38': '2.375rem',
      '40': '2.5rem',
      '44': '2.75rem',
      '48': '3rem',
      '52': '3.25rem',
      '56': '3.5rem',
      '64': '4rem',
      '68': '4.25rem',
      '80': '5rem',
      '90': '5.625rem',
      'responsive-app-cover': clamp({
        minPixels: 24,
        minViewportWidthPixels: screenSizes.xs,
        maxPixels: 40,
        maxViewportWidthPixels: screenSizes['2xl'],
      }),
      'responsive-page-cover': clamp({
        minPixels: 40,
        minViewportWidthPixels: screenSizes.xs,
        maxPixels: 90,
        maxViewportWidthPixels: screenSizes['2xl'],
      }),
    },
    lineHeight: {
      default: '1',
      normal: '1.4',
    },
    letterSpacing: {
      normal: '0',
      plump: '0.02em',
      wide: '0.03em',
      wider: '0.05em',
      widest: '0.2em',
    },
    screens: {
      'xs': `${screenSizes.xs}px`,
      'xsMax': { max: `${screenSizes.xs - 1}px` },
      'sm': `${screenSizes.sm}px`,
      'smMax': { max: `${screenSizes.sm - 1}px` },
      'md': `${screenSizes.md}px`,
      'mdMax': { max: `${screenSizes.md - 1}px` },
      'lg': `${screenSizes.lg}px`,
      'lgMax': { max: `${screenSizes.lg - 1}px` },
      'xl': `${screenSizes.xl}px`,
      'xlMax': { max: `${screenSizes.xl - 1}px` },
      '2xl': `${screenSizes['2xl']}px`,
      '2xlMax': { max: `${screenSizes['2xl'] - 1}px` },
      '3xl': `${screenSizes['3xl']}px`,
      '3xlMax': { max: `${screenSizes['3xl'] - 1}px` },
    },
    transitionTimingFunction: {
      smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0.0, 1, 1)',
      out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      inExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
      outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      inOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
      inQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
      outQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      inOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
      inBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      outBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      inOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    aspectRatio: {
      '16/9': '16 /9',
      '9/16': '9 / 16',
      '8/9': '8 / 9',
      '3/2': '3 / 2',
      '2/3': '2 / 3',
      '4/3': '4 / 3',
      '3/4': '3 / 4',
      '1/1': '1 / 1',
      '1/1.414': '1 / 1.414', // A4 Paper
    },
    extend: {
      transitionDuration: {
        175: '175ms',
        250: '250ms',
        350: '350ms',
        400: '400ms',
        450: '450ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
      },
      transitionDelay: {
        175: '175ms',
        250: '250ms',
        350: '350ms',
        400: '400ms',
        450: '450ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
      },
      zIndex: {
        '-1': '-1',
        '1': '1',
      },
    },
  },
  plugins: [],
} satisfies Config
