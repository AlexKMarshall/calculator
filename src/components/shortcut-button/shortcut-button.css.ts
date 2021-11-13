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
  transitionDuration: themeTokens.transition.duration,
  transitionProperty: `${themeTokens.transition.property}, filter`,
  outlineOffset: '2px',

  vars: {
    [shadowWidth]: '5px',
  },

  ':hover': {
    filter: 'brightness(1.2)',
  },

  selectors: {
    '&:active, &.active': {
      filter: 'brightness(0.7)',
    },
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
  transitionDuration: themeTokens.transition.duration,
  transitionProperty: `${themeTokens.transition.property}, transform`,

  selectors: {
    [`${base}:active &, ${base}.active &`]: {
      // .active is the class added when keyboard shortcut presses button
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
