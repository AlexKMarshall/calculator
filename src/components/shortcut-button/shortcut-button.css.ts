import { colorThemeTokens, themeTokens } from 'src/styles/theme.css'

import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

const base = style({
  display: 'grid',
  placeItems: 'center',
  padding: themeTokens.space.s,
  lineHeight: 1,
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
        backgroundColor: colorThemeTokens.button.primary,
      },
      secondary: {
        backgroundColor: colorThemeTokens.button.secondary,
      },
      accent: {
        backgroundColor: colorThemeTokens.button.accent,
      },
    },
  },
  defaultVariants: { size: 'small', color: 'primary' },
})
