import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { assign, createMachine } from 'xstate'

import { useMachine } from '@xstate/react'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const
const operators = ['+', '-', '*', '/'] as const

export type NumberKey = typeof numbers[number]
export type OperatorKey = typeof operators[number]

const isNonZero = (context: CalculatorContext, event: CalculatorEvent) =>
  event.type === 'number' && event.key !== '0'

const storeOperand1Value = assign<CalculatorContext, CalculatorEvent>({
  operand1Value: (context) => context.display,
})
const storeOperand2Value = assign<CalculatorContext, CalculatorEvent>({
  operand2Value: (context) => context.display,
})
const calculateResult = assign<CalculatorContext, CalculatorEvent>({
  display: ({ operand1Value, operator, operand2Value }) =>
    calculate(operand1Value, operand2Value, operator).toString(),
})

type NumberEvent = { type: 'number'; key: NumberKey }
type OperatorEvent = { type: 'operator'; key: OperatorKey }
type CalculatorEvent = NumberEvent | OperatorEvent | { type: 'equals' }
type CalculatorContext = {
  operand1Value: string
  operand2Value: string
  operator: OperatorKey | null
  display: string
}

const calculate = (
  operand1: CalculatorContext['operand1Value'],
  operand2: CalculatorContext['operand2Value'],
  operator: CalculatorContext['operator']
) => {
  const op1 = parseInt(operand1)
  const op2 = parseInt(operand2)
  switch (operator) {
    case '+':
      return op1 + op2
    case '-':
      return op1 - op2
    case '*':
      return op1 * op2
    case '/':
      return op1 / op2
    default:
      return 0
  }
}

const calculatorMachine = createMachine<CalculatorContext, CalculatorEvent>({
  id: 'calculator',
  initial: 'start',
  context: {
    operand1Value: '',
    operator: null,
    operand2Value: '',
    display: '0',
  },
  states: {
    start: {
      on: {
        number: {
          target: 'operand1',
          actions: assign({
            display: (context, event) => event.key,
          }),
          cond: isNonZero,
        },
      },
    },
    operand1: {
      on: {
        number: {
          actions: assign({
            display: (context, event) => `${context.display}${event.key}`,
          }),
        },
        operator: {
          target: 'operator',
          actions: [
            storeOperand1Value,
            assign({
              operator: (context, event) => event.key,
            }),
          ],
        },
      },
    },
    operator: {
      on: {
        number: {
          target: 'operand2',
          actions: assign({
            display: (context, event) => event.key,
          }),
          cond: isNonZero,
        },
      },
    },
    operand2: {
      on: {
        number: {
          actions: assign({
            display: (context, event) => `${context.display}${event.key}`,
          }),
        },
        operator: {
          target: 'operator',
          actions: [
            storeOperand2Value,
            calculateResult,
            storeOperand1Value,
            assign({
              operator: (context, event) => event.key,
            }),
          ],
        },

        equals: {
          target: 'result',
          actions: [
            assign({
              operand2Value: (context, event) => context.display,
            }),
          ],
        },
      },
    },
    result: {
      entry: [calculateResult],
      on: {
        number: {
          target: 'operand1',
          actions: assign({
            display: (context, event) => event.key,
          }),
          cond: isNonZero,
        },
        operator: {
          target: 'operator',
          actions: [
            storeOperand1Value,
            assign({
              operator: (context, event) => event.key,
            }),
          ],
        },
      },
    },
  },
})

function useKeyboardShortcut() {
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

  return useMemo(
    () => ({
      registerShortcut: (shortcut: string, action: () => void) => {
        listeners.current.set(shortcut, action)
      },
      unregisterShortcut: (shortcut: string) => {
        listeners.current.delete(shortcut)
      },
    }),
    []
  )
}

type ShortcutContext = {
  registerShortcut: (shortcut: string, action: () => void) => void
  unregisterShortcut: (shortcut: string) => void
}
const ShortcutContext = createContext<ShortcutContext | undefined>(undefined)
ShortcutContext.displayName = 'ShortcutContext'

function ShortcutProvider({ children }: { children: ReactNode }): JSX.Element {
  const value = useKeyboardShortcut()
  return (
    <ShortcutContext.Provider value={value}>
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

function useRegisterKeyboardShortcut(shortcut: string, action: () => void) {
  const { registerShortcut, unregisterShortcut } = useShortcutContext()

  useEffect(() => {
    registerShortcut(shortcut, action)
    return () => unregisterShortcut(shortcut)
  }, [action, registerShortcut, shortcut, unregisterShortcut])
}

type ShortcutButtonProps = {
  shortcut: string
  children: string
  action: () => void
}
function ShortcutButton({
  children,
  action,
  shortcut,
}: ShortcutButtonProps): JSX.Element {
  useRegisterKeyboardShortcut(shortcut, action)

  return (
    <button type="button" onClick={action}>
      {children}
    </button>
  )
}
