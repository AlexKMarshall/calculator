import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

export const cluster = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  variants: {
    wrap: {
      reverse: {
        flexWrap: 'wrap-reverse',
      },
    },
  },
})
