import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { themeTokens } from 'src/styles/theme.css'

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
  },
  defaultVariants: { size: 'small' },
})
