import * as styles from './shortcut-button.css'

import { Box, BoxProps } from '..'

import { ReactNode } from 'react'
import { useKeyboardShortcut } from 'src/hooks/keyboard-shortcut'

type Props = {
  shortcut: string
  children: ReactNode
  action: () => void
  size?: 'small' | 'large'
  fontSize?: BoxProps['fontSize']
}
export function ShortcutButton({
  children,
  action,
  shortcut,
  size = 'small',
  fontSize,
}: Props): JSX.Element {
  useKeyboardShortcut(shortcut, action)

  return (
    <Box
      component="button"
      type="button"
      onClick={action}
      className={styles.shortcutButton({ size })}
      fontSize={fontSize}
    >
      {children}
    </Box>
  )
}
