import * as styles from './shortcut-button.css'

import { useKeyboardShortcut } from 'src/hooks/keyboard-shortcut'

type Props = {
  shortcut: string
  children: string
  action: () => void
}
export function ShortcutButton({
  children,
  action,
  shortcut,
}: Props): JSX.Element {
  useKeyboardShortcut(shortcut, action)

  return (
    <button type="button" onClick={action} className={styles.shortcutButton}>
      {children}
    </button>
  )
}
