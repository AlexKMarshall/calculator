import { resolveScreenMQ, themeTokens } from 'src/styles/theme.css'

import { style } from '@vanilla-extract/css'

export const center = style({
  width: '100%',
  maxWidth: '560px',
  // marginInline: 'auto', -> not fully supported in safari
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: themeTokens.space.s,
  paddingRight: themeTokens.space.s,

  '@media': {
    [resolveScreenMQ.s]: {
      paddingLeft: themeTokens.space.l,
      paddingRight: themeTokens.space.l,
    },
  },
})
