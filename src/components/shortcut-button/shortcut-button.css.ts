import { colorThemeTokens, themeTokens } from 'src/styles/theme.css'

import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

const base = style({
  display: 'grid',
  placeItems: 'center',
  padding: themeTokens.space.s,
  lineHeight: 1,
  border: 'none',
  borderRadius: themeTokens.borderRadius.s,
  borderBottomStyle: 'solid',
  borderBottomWidth: '5px',
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
        color: colorThemeTokens.text.button.primary,
        borderColor: colorThemeTokens.shadow.button.primary,
      },
      secondary: {
        backgroundColor: colorThemeTokens.button.secondary,
        color: colorThemeTokens.text.button.secondary,
        borderColor: colorThemeTokens.shadow.button.secondary,
      },
      accent: {
        backgroundColor: colorThemeTokens.button.accent,
        color: colorThemeTokens.text.button.accent,
        borderColor: colorThemeTokens.shadow.button.accent,
      },
    },
  },
  defaultVariants: { size: 'small', color: 'primary' },
})
