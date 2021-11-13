import { colorThemeTokens, resolveScreenMQ, themeTokens } from './theme.css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

const properties = defineProperties({
  conditions: {
    all: {},
    small: { '@media': resolveScreenMQ.s },
    medium: { '@media': resolveScreenMQ.m },
  },
  defaultCondition: 'all',
  properties: {
    padding: themeTokens.space,
    gap: themeTokens.space,
    fontSize: themeTokens.fontSize,
    textTransform: ['uppercase'],
    backgroundColor: colorThemeTokens.background,
    borderRadius: themeTokens.borderRadius,
    justifyContent: ['flex-start', 'flex-end', 'space-between'],
    alignItems: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
    letterSpacing: themeTokens.letterSpacing,
  },
})

export const sprinkles = createSprinkles(properties)
