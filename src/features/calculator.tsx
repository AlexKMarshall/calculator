import { assign, createMachine } from 'xstate'

import { useMachine } from '@xstate/react'

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const
const operators = ['+', '-', '*', '/'] as const

export type NumberKey = typeof numbers[number]
export type OperatorKey = typeof operators[number]

type CalculatorEvent =
  | { type: 'number'; key: NumberKey }
  | { type: 'operator'; key: OperatorKey }
  | { type: 'equals' }
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
          actions: assign({
            operand1Value: (context, event) => context.display,
            operator: (context, event) => event.key,
          }),
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
        equals: {
          target: 'result',
          actions: assign({
            operand2Value: (context, event) => context.display,
          }),
        },
      },
    },
    result: {
      entry: [
        assign({
          display: ({ operand1Value, operator, operand2Value }, event) => {
            return calculate(operand1Value, operand2Value, operator).toString()
          },
        }),
      ],
    },
  },
})

export function Calculator(): JSX.Element {
  const [state, send] = useMachine(calculatorMachine)

  return (
    <>
      {numbers.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => send({ type: 'number', key: number })}
        >
          {number}
        </button>
      ))}
      {operators.map((operator) => (
        <button
          key={operator}
          type="button"
          onClick={() => send({ type: 'operator', key: operator })}
        >
          {operator}
        </button>
      ))}
      <button type="button" onClick={() => send('equals')}>
        =
      </button>
      <output>{state.context.display}</output>
    </>
  )
}
