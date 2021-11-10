import { colorThemeTokens, themeTokens } from './theme.css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

const properties = defineProperties({
  properties: {
    padding: themeTokens.space,
    gap: themeTokens.space,
    fontSize: themeTokens.fontSize,
    textTransform: ['uppercase'],
    backgroundColor: colorThemeTokens.background,
    borderRadius: themeTokens.borderRadius,
  },
})

export const sprinkles = createSprinkles(properties)
