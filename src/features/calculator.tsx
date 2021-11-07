import { assign, createMachine } from 'xstate'

import { isContext } from 'vm'
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
