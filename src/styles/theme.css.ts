import { createGlobalTheme } from '@vanilla-extract/css'

export const themeTokens = createGlobalTheme(':root', {
  space: {
    xs: '0.75rem',
    s: '1rem',
    m: '1.25rem',
    l: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  },
  fontSize: {
    s: '1rem',
    m: '2rem',
  },
})
