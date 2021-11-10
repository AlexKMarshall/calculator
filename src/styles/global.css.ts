import { globalStyle } from '@vanilla-extract/css'
import { themeTokens } from './theme.css'

globalStyle('html, body', {
  fontFamily: 'Spartan, sans-serif',
  fontWeight: 700,
})

globalStyle('body', {
  fontSize: themeTokens.fontSize.m,
})
