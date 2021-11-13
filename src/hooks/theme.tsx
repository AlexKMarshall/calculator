import { darkTheme, highContrastTheme, lightTheme } from 'src/styles/theme.css'
import { useLayoutEffect, useState } from 'react'

const themes = ['dark', 'light', 'highContrast'] as const

type Theme = typeof themes[number]
type SwitchPosition = 'left' | 'middle' | 'right'

export const themeMeta: Record<
  Theme,
  { className: string; position: SwitchPosition }
> = {
  dark: { className: darkTheme, position: 'left' },
  light: { className: lightTheme, position: 'middle' },
  highContrast: { className: highContrastTheme, position: 'right' },
}

const themeStorageKey = 'color-preference'
function getLocalStorageTheme(): Theme | null {
  const storageTheme: unknown = window.localStorage.getItem(themeStorageKey)
  const maybeTheme = themes.find((theme) => theme === storageTheme)
  return maybeTheme ?? null
}

function getMediaQueryTheme(): Theme | null {
  const mql = window.matchMedia('(prefers-color-scheme: dark')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'

  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light'
  }
  return null
}

export function useTheme(defaultTheme: Theme = 'light') {
  const [savedPreference, setSavedPreference] = useState<Theme | null>(null)
  const [mediaQueryPrefernce, setMediaQueryPreference] = useState<Theme | null>(
    null
  )

  // we want to figure out the initial value before painting
  // so we don't have a chance to display the wrong value
  useLayoutEffect(function loadInitialThemeValue() {
    const localStorageTheme = getLocalStorageTheme()
    const mediaQueryTheme = getMediaQueryTheme()
    if (localStorageTheme) {
      setSavedPreference(localStorageTheme)
    }
    if (mediaQueryTheme) {
      setMediaQueryPreference(mediaQueryTheme)
    }
  }, [])

  useLayoutEffect(
    function updateSavedThemePreference() {
      if (savedPreference) {
        document.body.classList.forEach((c) => {
          document.body.classList.remove(c)
        })

        const themeClass = themeMeta[savedPreference].className
        document.body.classList.add(themeClass)

        window.localStorage.setItem(themeStorageKey, savedPreference)
      }
    },
    [savedPreference]
  )

  const theme = savedPreference ?? mediaQueryPrefernce ?? defaultTheme

  return [theme, setSavedPreference] as const
}
