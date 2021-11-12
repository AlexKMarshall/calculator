import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

type ShortcutContext = {
  registerShortcut: (shortcut: string | string[], action: () => void) => void
  unregisterShortcut: (shortcut: string | string[]) => void
}
const ShortcutContext = createContext<ShortcutContext | undefined>(undefined)
ShortcutContext.displayName = 'ShortcutContext'

export function ShortcutProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const listeners = useRef(new Map<string, () => void>())

  useEffect(() => {
    document.body.setAttribute('tabIndex', '-1')

    const listener = (e: KeyboardEvent) => {
      const action = listeners.current.get(e.key)
      if (action) {
        action()
      }
    }

    document.body.addEventListener('keydown', listener)

    return () => {
      document.body.removeEventListener('keydown', listener)
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      registerShortcut: (shortcuts: string | string[], action: () => void) => {
        const providedShortcuts = Array.isArray(shortcuts)
          ? shortcuts
          : [shortcuts]
        providedShortcuts.forEach((shortcut) => {
          listeners.current.set(shortcut, action)
        })
      },
      unregisterShortcut: (shortcuts: string | string[]) => {
        const providedShortcuts = Array.isArray(shortcuts)
          ? shortcuts
          : [shortcuts]
        providedShortcuts.forEach((shortcut) => {
          listeners.current.delete(shortcut)
        })
      },
    }),
    []
  )

  return (
    <ShortcutContext.Provider value={contextValue}>
      {children}
    </ShortcutContext.Provider>
  )
}

function useShortcutContext() {
  const context = useContext(ShortcutContext)
  if (!context) {
    throw new Error(
      'useShortcutContext must be used within ShortcutContext Provider'
    )
  }
  return context
}

export function useKeyboardShortcut(
  shortcut: string | string[],
  action: () => void
) {
  const { registerShortcut, unregisterShortcut } = useShortcutContext()

  useEffect(() => {
    registerShortcut(shortcut, action)
    return () => unregisterShortcut(shortcut)
  }, [action, registerShortcut, shortcut, unregisterShortcut])
}
