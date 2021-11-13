import * as styles from './theme-switch.css'

import { Cluster, Text } from '..'
import { darkTheme, highContrastTheme, lightTheme } from 'src/styles/theme.css'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'highContrast'
type SwitchPosition = 'left' | 'middle' | 'right'

const themeMeta: Record<
  Theme,
  { className: string; position: SwitchPosition }
> = {
  dark: { className: darkTheme, position: 'left' },
  light: { className: lightTheme, position: 'middle' },
  highContrast: { className: highContrastTheme, position: 'right' },
}

type Props = {}
export function ThemeSwitch(props: Props): JSX.Element {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('dark')

  useEffect(() => {
    document.body.classList.forEach((c) => {
      document.body.classList.remove(c)
    })

    const themeClass = themeMeta[selectedTheme].className
    document.body.classList.add(themeClass)
  }, [selectedTheme])
  return (
    <Cluster aria-labelledby="theme-switch" align="flex-end" gap="s">
      <Text size="xs" id="theme-switch" transform="uppercase" spacing="wide">
        Theme
      </Text>
      <div className={styles.gridWrapper}>
        <span className={styles.visualSwitch}>
          <span
            className={styles.thumb({
              position: themeMeta[selectedTheme].position,
            })}
          />
        </span>
        <label className={styles.label}>
          <Text size="xs">1</Text>
          <input
            type="radio"
            name="theme"
            checked={selectedTheme === 'dark'}
            onChange={() => setSelectedTheme('dark')}
            className={styles.hiddenInput}
          />
        </label>
        <label className={styles.label}>
          <Text size="xs">2</Text>

          <input
            type="radio"
            name="theme"
            checked={selectedTheme === 'light'}
            onChange={() => setSelectedTheme('light')}
            className={styles.hiddenInput}
          />
        </label>
        <label className={styles.label}>
          <Text size="xs">3</Text>

          <input
            type="radio"
            name="theme"
            checked={selectedTheme === 'highContrast'}
            onChange={() => setSelectedTheme('highContrast')}
            className={styles.hiddenInput}
          />
        </label>
      </div>
    </Cluster>
  )
}
