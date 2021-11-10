import {
  createGlobalTheme,
  createGlobalThemeContract,
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css'

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

export const colorThemeTokens = createThemeContract({
  background: {
    body: null,
    display: null,
    keypad: null,
  },
  button: {
    primary: null,
    secondary: null,
    accent: null,
  },
})

export const lightTheme = createTheme(colorThemeTokens, {
  background: {
    body: 'hsl(222 26% 31%)',
    display: 'hsl(224 36% 15%)',
    keypad: 'hsl(223 31% 20%)',
  },
  button: {
    primary: 'hsl(30 25% 89%)',
    secondary: 'hsl(225 21% 49%)',
    accent: 'hsl(6 63% 50%)',
  },
})
