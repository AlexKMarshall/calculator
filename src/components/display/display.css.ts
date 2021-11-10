import { style } from '@vanilla-extract/css'
import { themeTokens } from 'src/styles/theme.css'

export const display = style({
  textAlign: 'right',
  padding: themeTokens.space.l,
})
