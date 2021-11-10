import { colorThemeTokens, themeTokens } from 'src/styles/theme.css'

import { style } from '@vanilla-extract/css'

export const display = style({
  textAlign: 'right',
  padding: themeTokens.space.l,
  backgroundColor: colorThemeTokens.background.display,
})
