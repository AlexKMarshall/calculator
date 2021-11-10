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
    none: '0px',
  },
  borderRadius: {
    s: '4px',
    m: '8px',
    l: '16px',
    pill: '999px',
    circle: '50%',
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
  shadow: {
    button: {
      primary: null,
      secondary: null,
      accent: null,
    },
  },
  text: {
    neutral: {
      dark: null,
      light: null,
    },
    body: null,
    button: {
      primary: null,
      secondary: null,
      accent: null,
    },
  },
})

export const darkTheme = createTheme(colorThemeTokens, {
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
  shadow: {
    button: {
      primary: 'hsl(28 16% 65%)',
      secondary: 'hsl(224 28% 35%)',
      accent: 'hsl(6 70% 34%)',
    },
  },
  text: {
    neutral: {
      dark: 'hsl(221 14% 31%)',
      light: 'hsl(0 0% 100% / 0.98)',
    },
    body: colorThemeTokens.text.neutral.light,
    button: {
      primary: colorThemeTokens.text.neutral.dark,
      secondary: colorThemeTokens.text.neutral.light,
      accent: colorThemeTokens.text.neutral.light,
    },
  },
})
