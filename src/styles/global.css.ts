import { colorThemeTokens, resolveScreenMQ, themeTokens } from './theme.css'

import { globalStyle } from '@vanilla-extract/css'

globalStyle('html, body', {
  fontFamily: 'Spartan, sans-serif',
  fontWeight: 700,
})

globalStyle('body', {
  backgroundColor: colorThemeTokens.background.body,
  fontSize: themeTokens.fontSize.s,
  color: colorThemeTokens.text.body,
  transitionDuration: themeTokens.transition.duration,
  transitionProperty: themeTokens.transition.property,

  '@media': {
    [resolveScreenMQ.s]: {
      fontSize: themeTokens.fontSize.m,
    },
  },
})
