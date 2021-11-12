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

const validateDisplay = (result: string) =>
  expect(screen.getByRole('status')).toHaveValue(result)

test('addition', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(1)

  userEvent.click(getButton('+'))
  triggerNumber(2)
  userEvent.click(getButton('='))

  validateDisplay('13')
})

test('subtraction', () => {
  render(<Calculator />)
  triggerNumber(1)
  triggerNumber(8)
  userEvent.click(getButton('Minus'))
  triggerNumber(1)
  triggerNumber(3)
  userEvent.click(getButton('='))

  validateDisplay('5')
})
test('multiplication', () => {
  render(<Calculator />)
  triggerNumber(2)
  triggerNumber(0)
  userEvent.click(getButton('Multiply'))
  triggerNumber(3)
  userEvent.click(getButton('='))

  validateDisplay('60')
})
test('division', () => {
  render(<Calculator />)
  triggerNumber(8)
  userEvent.click(getButton('Divide'))
  triggerNumber(4)
  userEvent.click(getButton('='))

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
  userEvent.click(getButton('+'))
  triggerNumber(0)
  triggerNumber(5)

  validateDisplay('5')
})
test('chained operators', () => {
  render(<Calculator />)
  triggerNumber(3)
  userEvent.click(getButton('+'))
  triggerNumber(3)
  userEvent.click(getButton('+'))
  triggerNumber(3)
  userEvent.click(getButton('='))

  validateDisplay('9')
})
test('make second calculation', () => {
  render(<Calculator />)
  triggerNumber(3)
  userEvent.click(getButton('+'))
  triggerNumber(3)
  userEvent.click(getButton('='))

  triggerNumber(2)
  userEvent.click(getButton('+'))
  triggerNumber(2)
  userEvent.click(getButton('='))

  validateDisplay('4')
})
test('chain operator after equals', () => {
  render(<Calculator />)
  triggerNumber(3)
  userEvent.click(getButton('+'))
  triggerNumber(3)
  userEvent.click(getButton('='))

  userEvent.click(getButton('+'))
  triggerNumber(2)
  userEvent.click(getButton('='))

  validateDisplay('8')
})
test('using keyboard', () => {
  render(<Calculator />)
  triggerNumber(1, 'keyboard')
  userEvent.type(document.body, '+')
  triggerNumber(3, 'keyboard')
  userEvent.type(document.body, '=')

  validateDisplay('4')
})
test('large numbers', () => {
  render(<Calculator />)
  userEvent.type(document.body, '123456789')

  validateDisplay('123,456,789')
})
test('numbers with zeros in', () => {
  render(<Calculator />)
  triggerNumber(2)
  triggerNumber(0)
  validateDisplay('20')
  userEvent.type(document.body, '+')
  triggerNumber(4)
  triggerNumber(0)
  triggerNumber(0)
  validateDisplay('400')
  userEvent.type(document.body, '=')
  validateDisplay('420')
})
describe('decimals', () => {
  test('operand 1, decimal greater than 1', () => {
    render(<Calculator />)
    triggerNumber(1)
    userEvent.type(document.body, '.')
    triggerNumber(3)

    validateDisplay('1.3')
  })
  test('operand 1, decimal less than 1', () => {
    render(<Calculator />)
    triggerNumber(0)
    userEvent.type(document.body, '.')
    triggerNumber(4)
    validateDisplay('0.4')
  })
  test('operand 2, decimal greater than 1', () => {
    render(<Calculator />)
    triggerNumber(1)
    userEvent.type(document.body, '+')
    triggerNumber(2)
    userEvent.type(document.body, '.')
    triggerNumber(5)
    validateDisplay('2.5')
    userEvent.type(document.body, '=')
    validateDisplay('3.5')
  })
  test('operand 2, decimal less than 1', () => {
    render(<Calculator />)
    triggerNumber(1)
    userEvent.type(document.body, '+')
    triggerNumber(0)
    userEvent.type(document.body, '.')
    triggerNumber(5)
    validateDisplay('0.5')
    userEvent.type(document.body, '=')
    validateDisplay('1.5')
  })
  test('decimals with zeroes in', () => {
    render(<Calculator />)
    triggerNumber(0)
    userEvent.type(document.body, '.')
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
  userEvent.type(document.body, '-')
  triggerNumber(2)

  userEvent.click(screen.getByRole('button', { name: /reset/i }))

  validateDisplay('0')
})

test('delete', () => {
  render(<Calculator />)
  userEvent.type(document.body, '123.456')

  const deleteButton = screen.getByRole('button', { name: /delete/i })
  userEvent.click(deleteButton)
  validateDisplay('123.45')
  userEvent.click(deleteButton)
  validateDisplay('123.4')
  userEvent.click(deleteButton)
  validateDisplay('123.')
  userEvent.click(deleteButton)
  validateDisplay('123')
  userEvent.click(deleteButton)
  validateDisplay('12')
  userEvent.click(deleteButton)
  validateDisplay('1')
  userEvent.click(deleteButton)
  validateDisplay('0')

  userEvent.type(document.body, '123')
  validateDisplay('123')
  userEvent.type(document.body, '+')

  // check deleting operand 2
  userEvent.type(document.body, '123.456')
  userEvent.click(deleteButton)
  validateDisplay('123.45')
  userEvent.click(deleteButton)
  validateDisplay('123.4')
  userEvent.click(deleteButton)
  validateDisplay('123.')
  userEvent.click(deleteButton)
  validateDisplay('123')
  userEvent.click(deleteButton)
  validateDisplay('12')
  userEvent.click(deleteButton)
  validateDisplay('1')
  userEvent.click(deleteButton)
  validateDisplay('0')
})
test('negative numbers', () => {
  render(<Calculator />)
  userEvent.type(document.body, '-')
  triggerNumber(2)
  userEvent.type(document.body, '=')
  validateDisplay('-2')
})
test('allow return as equals key', () => {
  render(<Calculator />)
  triggerNumber(1)
  userEvent.type(document.body, '+')
  triggerNumber(2)
  userEvent.type(document.body, '{enter}')
  validateDisplay('3')
})
