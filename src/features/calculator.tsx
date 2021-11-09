import { ShortcutButton } from 'src/components'
import { ShortcutProvider } from 'src/hooks/keyboard-shortcut'
import { calculatorMachine } from './calculator.machine'
import { useMachine } from '@xstate/react'

export function Calculator(): JSX.Element {
  const [state, send] = useMachine(calculatorMachine)

  return (
    <ShortcutProvider>
      <output>{state.context.display}</output>
      <ShortcutButton
        action={() => send({ type: 'number', key: '7' })}
        shortcut="7"
      >
        7
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '8' })}
        shortcut="8"
      >
        8
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '9' })}
        shortcut="9"
      >
        9
      </ShortcutButton>
      <ShortcutButton action={() => {}} shortcut="Delete">
        DEL
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '4' })}
        shortcut="4"
      >
        4
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '5' })}
        shortcut="5"
      >
        5
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '6' })}
        shortcut="6"
      >
        6
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'operator', key: '+' })}
        shortcut="+"
      >
        +
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '1' })}
        shortcut="1"
      >
        1
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '2' })}
        shortcut="2"
      >
        2
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '3' })}
        shortcut="3"
      >
        3
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'operator', key: '-' })}
        shortcut="-"
      >
        -
      </ShortcutButton>
      <ShortcutButton action={() => {}} shortcut=".">
        .
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'number', key: '0' })}
        shortcut="0"
      >
        0
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'operator', key: '*' })}
        shortcut="*"
      >
        *
      </ShortcutButton>
      <ShortcutButton
        action={() => send({ type: 'operator', key: '/' })}
        shortcut="/"
      >
        /
      </ShortcutButton>
      <ShortcutButton action={() => send('equals')} shortcut="=">
        =
      </ShortcutButton>
    </ShortcutProvider>
  )
}
