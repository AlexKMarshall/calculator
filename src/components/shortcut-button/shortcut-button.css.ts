import {
  assignVars,
  createThemeContract,
  createVar,
  style,
} from '@vanilla-extract/css'
import { colorThemeTokens, themeTokens } from 'src/styles/theme.css'

import { calc } from '@vanilla-extract/css-utils'
import { recipe } from '@vanilla-extract/recipes'

const colorVars = createThemeContract({
  backgroundColor: null,
  color: null,
  borderColor: null,
})

const shadowWidth = createVar()

const base = style({
  position: 'relative',
  display: 'grid',
  padding: themeTokens.space.none,
  border: 'none',
  borderRadius: themeTokens.borderRadius.s,
  backgroundColor: 'transparent',
  color: colorVars.color,
  borderColor: colorVars.borderColor,
  overflow: 'hidden',
  transitionDuration: '200ms',
  transitionProperty: 'filter',

  vars: {
    [shadowWidth]: '5px',
  },

  ':hover': {
    filter: 'brightness(1.2)',
  },

  ':active': {
    filter: 'brightness(0.8)',
  },

  ':before': {
    content: '',
    position: 'absolute',
    top: '50%',
    right: '0',
    bottom: '0',
    left: '0',
    backgroundColor: colorVars.borderColor,
  },
})

export const inner = style({
  position: 'relative',
  height: calc.subtract('100%', shadowWidth),
  display: 'grid',
  placeItems: 'center',
  padding: themeTokens.space.s,
  lineHeight: 1,
  backgroundColor: colorVars.backgroundColor,
  borderRadius: themeTokens.borderRadius.s,
  transitionDuration: '100ms',
  transitionProperty: 'transform',

  selectors: {
    [`${base}:active &`]: {
      transform: 'translateY(2px)',
    },
  },
})

export const shortcutButton = recipe({
  base,

  variants: {
    size: {
      small: {
        gridColumn: 'span 1',
      },
      large: {
        gridColumn: 'span 2',
      },
    },
    color: {
      primary: {
        vars: assignVars(colorVars, {
          backgroundColor: colorThemeTokens.button.primary,
          color: colorThemeTokens.text.button.primary,
          borderColor: colorThemeTokens.shadow.button.primary,
        }),
      },
      secondary: {
        vars: assignVars(colorVars, {
          backgroundColor: colorThemeTokens.button.secondary,
          color: colorThemeTokens.text.button.secondary,
          borderColor: colorThemeTokens.shadow.button.secondary,
        }),
      },
      accent: {
        vars: assignVars(colorVars, {
          backgroundColor: colorThemeTokens.button.accent,
          color: colorThemeTokens.text.button.accent,
          borderColor: colorThemeTokens.shadow.button.accent,
        }),
      },
    },
  },
  defaultVariants: { size: 'small', color: 'primary' },
})
