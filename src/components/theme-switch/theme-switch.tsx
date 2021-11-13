import * as styles from './theme-switch.css'

import { Cluster, Text } from '..'
import { themeMeta, useTheme } from 'src/hooks/theme'

export function ThemeSwitch(): JSX.Element {
  const [selectedTheme, setSelectedTheme] = useTheme()

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
