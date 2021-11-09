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
    <button type="button" onClick={action}>
      {children}
    </button>
  )
}
