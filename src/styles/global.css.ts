import { colorThemeTokens, themeTokens } from './theme.css'

import { globalStyle } from '@vanilla-extract/css'

globalStyle('html, body', {
  fontFamily: 'Spartan, sans-serif',
  fontWeight: 700,
})

globalStyle('body', {
  backgroundColor: colorThemeTokens.background.body,
  fontSize: themeTokens.fontSize.m,
})
