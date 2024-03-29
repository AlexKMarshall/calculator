import { colorThemeTokens, themeTokens } from 'src/styles/theme.css'

import { style } from '@vanilla-extract/css'

export const display = style({
  lineHeight: 1,
  textAlign: 'right',
  backgroundColor: colorThemeTokens.background.display,
  borderRadius: themeTokens.borderRadius.m,
  overflowX: 'auto',
})
