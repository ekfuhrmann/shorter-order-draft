// IMPORTANT: PostCSS Converts all `px` values to `rem`
const pxPair = (value) => ({ [value]: `${value}px` })

/**
 * pxBoundsToFluidRem
 * Given a minimum size, maximum size, and a query range,
 * returns a CSS function to fluidly transition between minimum and maximum
 *
 * @param {Number} minSize Size at minimum breakpoint, in unitless pixels
 * @param {Number} maxSize Size at maximum breakpoint, in unitless pixels
 * @param {Number} minBound The breakpoint, in unitless pixels, that correlates to minimum size. Passing undefined will use default.
 * @param {Number} maxBound The breakpoint, in unitless pixels, that correlates to maximum size. Passing undefined will use default.
 * @param {String} boundUnit The unit to use for scaling between min & max. Pass `vh` to scale as window height, `cqw` to scale as query container width, etc.
 * @returns
 */
function pxBoundsToFluidRem(
  minSize,
  maxSize,
  minBound = 640, // match screens.sm
  maxBound = 1024, // match screens.5xl
  boundUnit = 'vw'
) {
  const clamp = (min, val, max) => `clamp(${[min, val, max].join(', ')})`

  /**
   * Adapted from https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
   */
  const slope = (maxSize - minSize) / (maxBound - minBound)
  const slopeToUnit = (slope * 100).toFixed(2)
  const interceptRem = Number((minSize - slope * minBound).toFixed(2))
  const val = `${slopeToUnit}${boundUnit} + ${interceptRem}px`
  const size = clamp(
    `${Math.min(minSize, maxSize)}px`,
    val,
    `${Math.max(minSize, maxSize)}px`
  )

  return size
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: '550px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '<sm': { max: '549.98px' },
      '<md': { max: '767.98px' },
      '<lg': { max: '1023.98px' },
      '<xl': { max: '1439.98px' },
    },
    colors: {
      white: '#FFFFFF',
      primary: '#E0320B',
      secondary: '#F1ECE3',
      current: 'currentColor',
    },
    spacing: {
      ...pxPair(0),
      ...pxPair(1),
      ...pxPair(2),
      ...pxPair(4),
      ...pxPair(6),
      ...pxPair(8),
      ...pxPair(10),
      ...pxPair(12),
      ...pxPair(14),
      ...pxPair(16),
      ...pxPair(18),
      ...pxPair(20),
      ...pxPair(21),
      ...pxPair(22),
      ...pxPair(24),
      ...pxPair(26),
      ...pxPair(28),
      ...pxPair(30),
      ...pxPair(32),
      ...pxPair(34),
      ...pxPair(36),
      ...pxPair(40),
      ...pxPair(44),
      ...pxPair(46),
      ...pxPair(48),
      ...pxPair(56),
      ...pxPair(64),
      ...pxPair(72),
      ...pxPair(80),
      ...pxPair(88),
      ...pxPair(96),
      ...pxPair(120),
    },
    backgroundImage: ({ theme }) => ({
      checkered: `conic-gradient(
				${theme('colors.primary')} 25%,
				${theme('colors.secondary')} 25%,
				${theme('colors.secondary')} 50%,
				${theme('colors.primary')} 50%,
				${theme('colors.primary')} 75%,
				${theme('colors.secondary')} 75%
			)`,
    }),
    fontFamily: {
      sans: [
        "'antipol-variable', 'sans-serif'",
        {
          fontVariationSettings: "'STCH' 1, 'wght' 400, 'wdth' 100",
        },
      ],
      serif: ["'p22-mackinac-pro', 'serif'"],
    },
    fontSize: {
      xl: pxBoundsToFluidRem(32, 80),
      lg: pxBoundsToFluidRem(24, 40),
      md: pxBoundsToFluidRem(20, 36),
      sm: pxBoundsToFluidRem(16, 20),
    },
    borderWidth: {
      DEFAULT: '1px',
      ...pxPair(3),
      ...pxPair(6),
    },
    extend: {
      backgroundSize: {
        checkered: 'calc(50px * 2) calc(50px * 2)',
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
}
