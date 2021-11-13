import { colorThemeTokens, themeTokens } from 'src/styles/theme.css'
import { createVar, style } from '@vanilla-extract/css'

import { calc } from '@vanilla-extract/css-utils'
import { recipe } from '@vanilla-extract/recipes'

export const gridWrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
})

export const label = style({
  gridRow: '1 / 3',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  paddingLeft: calc.divide(themeTokens.space.s, 2),
  paddingRight: calc.divide(themeTokens.space.s, 2),

  selectors: {
    '&:nth-of-type(1)': {
      gridColumn: '1 / 2',
    },
    '&:nth-of-type(2)': {
      gridColumn: '2 / 3',
    },
    '&:nth-of-type(3)': {
      gridColumn: '3 / 4',
    },
  },
})

export const hiddenInput = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0,
})

const sliderHeight = createVar()
const sliderGutter = createVar()
const thumbDiameter = createVar()

export const visualSwitch = style({
  display: 'block',
  height: sliderHeight,
  gridColumn: '1 / 4',
  gridRow: '2 /3',
  backgroundColor: colorThemeTokens.background.keypad,
  borderRadius: themeTokens.borderRadius.pill,
  position: 'relative',
  overflow: 'hidden',

  vars: {
    [sliderHeight]: themeTokens.space.xl,
  },
})

const translateX = createVar()
export const thumb = recipe({
  base: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transitionDuration: '200ms',
    transitionProperty: 'transform',
    transform: `translateX(${translateX})`,

    vars: {
      [sliderGutter]: '6px',
      [thumbDiameter]: calc.subtract(
        sliderHeight,
        calc.multiply(sliderGutter, 2)
      ),
    },

    ':after': {
      content: '',
      display: 'block',
      position: 'absolute',
      height: thumbDiameter,
      width: thumbDiameter,
      borderRadius: themeTokens.borderRadius.circle,
      backgroundColor: colorThemeTokens.button.accent,
      top: '50%',
      left: sliderGutter,
      transform: 'translateY(-50%)',
    },
  },

  variants: {
    position: {
      left: {
        vars: {
          [translateX]: '0px',
        },
      },
      middle: {
        vars: {
          [translateX]: calc('50%')
            .subtract(sliderGutter)
            .subtract(calc.divide(thumbDiameter, 2))
            .toString(),
        },
      },
      right: {
        vars: {
          [translateX]: calc('100%')
            .subtract(thumbDiameter)
            .subtract(calc.multiply(2, sliderGutter))
            .toString(),
        },
      },
    },
  },
})
