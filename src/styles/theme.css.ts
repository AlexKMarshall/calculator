import {
  createGlobalTheme,
  createGlobalThemeContract,
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css'

export const themeTokens = createGlobalTheme(':root', {
  space: {
    '2xs': '0.5rem',
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
    xs: '0.75rem',
    s: '1rem',
    m: '2rem',
  },
  letterSpacing: {
    wide: '0.2em',
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

export const lightTheme = createTheme(colorThemeTokens, {
  background: {
    body: 'hsl(0 0% 90%)',
    display: 'hsl(0 0% 93%)',
    keypad: 'hsl(0 5% 81%)',
  },
  button: {
    primary: 'hsl(45 7% 89%)',
    secondary: 'hsl(185 42% 37%)',
    accent: 'hsl(25 98% 40%)',
  },
  shadow: {
    button: {
      primary: 'hsl(35 11% 61%)',
      secondary: 'hsl(185 58% 25%)',
      accent: 'hsl(25 99% 27%)',
    },
  },
  text: {
    neutral: {
      dark: 'hsl(60 10% 19%)',
      light: 'hsl(0 0% 100% / 0.98)',
    },
    body: colorThemeTokens.text.neutral.dark,
    button: {
      primary: colorThemeTokens.text.neutral.dark,
      secondary: colorThemeTokens.text.neutral.light,
      accent: colorThemeTokens.text.neutral.light,
    },
  },
})

export const highContrastTheme = createTheme(colorThemeTokens, {
  background: {
    body: 'hsl(268 75% 9%)',
    display: 'hsl(268 71% 12%)',
    keypad: 'hsl(268 71% 12%)',
  },
  button: {
    primary: 'hsl(268 47% 21%)',
    secondary: 'hsl(281 89% 26%)',
    accent: 'hsl(176 100% 44%)',
  },
  shadow: {
    button: {
      primary: 'hsl(290 70% 36%)',
      secondary: 'hsl(285 91% 52%)',
      accent: 'hsl(177 92% 70%)',
    },
  },
  text: {
    neutral: {
      dark: 'hsl(198 20% 13%)',
      light: 'hsl(0 0% 100% / 0.98)',
    },
    body: 'hsl(52 100% 62%)',
    button: {
      primary: colorThemeTokens.text.body,
      secondary: colorThemeTokens.text.neutral.light,
      accent: colorThemeTokens.text.neutral.dark,
    },
  },
})
export const screenSizes = {
  s: 375,
  m: 768,
}

export const resolveScreenMQ = {
  s: `screen and (min-width: ${screenSizes.s}px)`,
  m: `screen and (min-width: ${screenSizes.m}px)`,
}
