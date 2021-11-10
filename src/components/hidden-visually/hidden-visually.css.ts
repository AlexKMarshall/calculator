import { style } from '@vanilla-extract/css'

export const hiddenVisually = style({
  position: 'absolute',
  clip: 'rect(0 0 0 0)',
  padding: 0,
  border: 0,
  height: '1px',
  width: '1px',
  overflow: 'hidden',
})
