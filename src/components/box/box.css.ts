import { style } from '@vanilla-extract/css'
import { themeTokens } from 'src/styles/theme.css'

export const box = style({
  display: 'block',
  transitionDuration: themeTokens.transition.duration,
  transitionProperty: 'background-color',
})
