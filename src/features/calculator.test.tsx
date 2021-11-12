import { render, screen } from '@testing-library/react'

import { Calculator } from './calculator'
import userEvent from '@testing-library/user-event'

const getButton = (key: string) => screen.getByRole('button', { name: key })
type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

function triggerNumber(number: Number, mode?: 'keyboard' | 'mouse') {
  const selectedMode = mode ?? Math.random() > 0.5 ? 'keyboard' : 'mouse'

  switch (selectedMode) {
    case 'keyboard':
      return userEvent.type(document.body, number.toString())
    case 'mouse':
      return userEvent.click(
        screen.getByRole('button', { name: number.toString() })
      )
  }
}

const operators = {
  '+': {
    shortcuts: ['+'],
    accessibleName: '+',
  },
  '-': {
    shortcuts: ['-'],
    accessibleName: 'Minus',
  },
  '*': {
    shortcuts: ['*', 'x'],
    accessibleName: 'Multiply',
  },
  '/': {
    shortcuts: ['/'],
    accessibleName: 'Divide',
  },
  decimal: {
    shortcuts: ['.'],
    accessibleName: 'Decimal Point',
  },
  equals: {
    shortcuts: ['=', '{enter}'],
    accessibleName: '=',
  },
  delete: {
    shortcuts: ['{del}', '{backspace}'],
    accessibleName: 'Delete',
  },
  reset: {
    shortcuts: ['{esc}'],
    accessibleName: 'Reset',
  },
}
function randomPick<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

function trigger(
  operator: keyof typeof operators,
  mode?: 'keyboard' | 'mouse'
) {
  const selectedMode = mode ?? Math.random() > 0.5 ? 'keyboard' : 'mouse'

  const { accessibleName, shortcuts } = operators[operator]
  const shortcut = randomPick(shortcuts)

  switch (selectedMode) {
    case 'keyboard':
      return userEvent.type(document.body, shortcut)
    case 'mouse':
      return userEvent.click(
        screen.getByRole('button', { name: accessibleName })
      )
  }
}

const validateDisplay = (result: string) =>
  expect(screen.getByRole('status')).toHaveValue(result)

test('addition', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(1)
  trigger('+')
  triggerNumber(2)
  trigger('equals')

  validateDisplay('13')
})

test('subtraction', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(8)
  trigger('-')
  triggerNumber(1)
  triggerNumber(3)
  trigger('equals')

  validateDisplay('5')
})
test('multiplication', () => {
  render(<Calculator />)
  triggerNumber(2)
  validateDisplay('2')
  triggerNumber(0)
  validateDisplay('20')
  trigger('*')
  triggerNumber(3)
  validateDisplay('3')
  trigger('equals')

  validateDisplay('60')
})
test('division', () => {
  render(<Calculator />)
  triggerNumber(8)
  trigger('/')
  triggerNumber(4)
  trigger('equals')

  validateDisplay('2')
})
test('no leading zeros operand1', () => {
  render(<Calculator />)
  triggerNumber(0)
  triggerNumber(3)

  validateDisplay('3')
})
test('no leading zeros operand2', () => {
  render(<Calculator />)
  triggerNumber(3)
  trigger('+')
  triggerNumber(0)
  triggerNumber(5)

  validateDisplay('5')
})
test('chained operators', () => {
  render(<Calculator />)
  triggerNumber(3)
  trigger('+')
  triggerNumber(3)
  trigger('+')
  triggerNumber(3)
  trigger('equals')

  validateDisplay('9')
})
test('make second calculation', () => {
  render(<Calculator />)
  triggerNumber(3)
  trigger('+')
  triggerNumber(3)
  trigger('equals')

  triggerNumber(2)
  trigger('+')
  triggerNumber(2)
  trigger('equals')

  validateDisplay('4')
})
test('chain operator after equals', () => {
  render(<Calculator />)
  triggerNumber(3)
  trigger('+')
  triggerNumber(3)
  trigger('equals')

  trigger('+')
  triggerNumber(2)
  trigger('equals')

  validateDisplay('8')
})
test('using keyboard', () => {
  render(<Calculator />)
  triggerNumber(1, 'keyboard')
  trigger('+', 'keyboard')
  triggerNumber(3, 'keyboard')
  trigger('equals', 'keyboard')

  validateDisplay('4')
})
test('large numbers', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(2)
  triggerNumber(3)
  triggerNumber(4)
  triggerNumber(5)
  triggerNumber(6)
  triggerNumber(7)
  triggerNumber(8)
  triggerNumber(9)

  validateDisplay('123,456,789')
})
test('numbers with zeros in', () => {
  render(<Calculator />)
  triggerNumber(2)
  triggerNumber(0)
  validateDisplay('20')
  trigger('+')
  triggerNumber(4)
  triggerNumber(0)
  triggerNumber(0)
  validateDisplay('400')
  trigger('equals')
  validateDisplay('420')
})
describe('decimals', () => {
  test('operand 1, decimal greater than 1', () => {
    render(<Calculator />)
    triggerNumber(1)
    trigger('decimal')
    triggerNumber(3)

    validateDisplay('1.3')
  })
  test('operand 1, decimal less than 1', () => {
    render(<Calculator />)
    triggerNumber(0)
    trigger('decimal')
    triggerNumber(4)
    validateDisplay('0.4')
  })
  test('operand 2, decimal greater than 1', () => {
    render(<Calculator />)
    triggerNumber(1)
    trigger('+')
    triggerNumber(2)
    trigger('decimal')
    triggerNumber(5)
    validateDisplay('2.5')
    trigger('equals')
    validateDisplay('3.5')
  })
  test('operand 2, decimal less than 1', () => {
    render(<Calculator />)
    triggerNumber(1)
    trigger('+')
    triggerNumber(0)
    trigger('decimal')
    triggerNumber(5)
    validateDisplay('0.5')
    trigger('equals')
    validateDisplay('1.5')
  })
  test('decimals with zeroes in', () => {
    render(<Calculator />)
    triggerNumber(0)
    trigger('decimal')
    triggerNumber(1)
    triggerNumber(0)
    validateDisplay('0.10')

    triggerNumber(5)
    validateDisplay('0.105')
  })
})
test('reset', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(0)
  trigger('-')
  triggerNumber(2)

  userEvent.click(screen.getByRole('button', { name: /reset/i }))

  validateDisplay('0')
})

test('delete', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(2)
  triggerNumber(3)
  trigger('decimal')
  triggerNumber(4)
  triggerNumber(5)
  triggerNumber(6)

  trigger('delete')
  validateDisplay('123.45')
  trigger('delete')
  validateDisplay('123.4')
  trigger('delete')
  validateDisplay('123.')
  trigger('delete')
  validateDisplay('123')
  trigger('delete')
  validateDisplay('12')
  trigger('delete')
  validateDisplay('1')
  trigger('delete')
  validateDisplay('0')

  triggerNumber(1)
  triggerNumber(2)
  triggerNumber(3)
  validateDisplay('123')
  trigger('+')

  // check deleting operand 2
  triggerNumber(1)
  triggerNumber(2)
  triggerNumber(3)
  trigger('decimal')
  triggerNumber(4)
  triggerNumber(5)
  triggerNumber(6)

  trigger('delete')
  validateDisplay('123.45')
  trigger('delete')
  validateDisplay('123.4')
  trigger('delete')
  validateDisplay('123.')
  trigger('delete')
  validateDisplay('123')
  trigger('delete')
  validateDisplay('12')
  trigger('delete')
  validateDisplay('1')
  trigger('delete')
  validateDisplay('0')
})
test('negative numbers', () => {
  render(<Calculator />)
  trigger('-')
  triggerNumber(2)
  trigger('equals')
  validateDisplay('-2')
})
