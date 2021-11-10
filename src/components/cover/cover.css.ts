import { globalStyle, style } from '@vanilla-extract/css'

export const cover = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

globalStyle(`${cover} > :first-child`, {
  marginTop: 'auto',
  marginBottom: 'auto',
})
