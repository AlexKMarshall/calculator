import { assign, createMachine } from 'xstate'

import { useMachine } from '@xstate/react'

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const

export type NumberKey = typeof numbers[number]

type CalculatorEvent =
  | { type: 'number'; key: NumberKey }
  | { type: 'operator'; key: '+' }
  | { type: 'equals' }
type CalculatorContext = {
  operand1Value: string
  operand2Value: string
  operator: '+' | null
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
  console.log(state.value)
  // console.log(state.context)
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
      <button
        type="button"
        onClick={() => send({ type: 'operator', key: '+' })}
      >
        +
      </button>
      <button type="button" onClick={() => send('equals')}>
        =
      </button>
      <output>{state.context.display}</output>
    </>
  )
}
