import * as styles from './shortcut-button.css'

import { Box, BoxProps } from '..'
import { ReactNode, useCallback, useState } from 'react'

import { useKeyboardShortcut } from 'src/hooks/keyboard-shortcut'

type Props = {
  shortcut: string | string[]
  children: ReactNode
  action: () => void
  size?: 'small' | 'large'
  color?: 'primary' | 'secondary' | 'accent'
  fontSize?: BoxProps['fontSize']
}
export function ShortcutButton({
  children,
  action,
  shortcut,
  size = 'small',
  color = 'primary',
  fontSize,
}: Props): JSX.Element {
  const [keyboardActive, setKeyboardActive] = useState(false)
  const keypress = useCallback(() => {
    action()
    setKeyboardActive(true)
    setTimeout(() => {
      setKeyboardActive(false)
    }, 100)
  }, [action])

  useKeyboardShortcut(shortcut, keypress)

  return (
    <Box
      component="button"
      type="button"
      onClick={action}
      className={[
        styles.shortcutButton({ size, color }),
        keyboardActive && 'active',
      ]}
      fontSize={fontSize}
    >
      <span className={styles.inner}>{children}</span>
    </Box>
  )
}
