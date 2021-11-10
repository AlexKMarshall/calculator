import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { themeTokens } from './theme.css'

const properties = defineProperties({
  properties: {
    padding: themeTokens.space,
    gap: themeTokens.space,
    fontSize: themeTokens.fontSize,
    textTransform: ['uppercase'],
  },
})

export const sprinkles = createSprinkles(properties)
