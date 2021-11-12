import { render, screen } from '@testing-library/react'

import { Calculator } from './calculator'
import userEvent from '@testing-library/user-event'

const getButton = (key: string) => screen.getByRole('button', { name: key })

const validateDisplay = (result: string) =>
  expect(screen.getByRole('status')).toHaveValue(result)

test('addition', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  validateDisplay('13')
})

test('subtraction', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('8'))
  userEvent.click(getButton('-'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateDisplay('5')
})
test('multiplication', () => {
  render(<Calculator />)
  userEvent.click(getButton('2'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('x'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateDisplay('60')
})
test('division', () => {
  render(<Calculator />)
  userEvent.click(getButton('8'))
  userEvent.click(getButton('/'))
  userEvent.click(getButton('4'))
  userEvent.click(getButton('='))

  validateDisplay('2')
})
test('no leading zeros operand1', () => {
  render(<Calculator />)
  userEvent.click(getButton('0'))
  userEvent.click(getButton('3'))

  validateDisplay('3')
})
test('no leading zeros operand2', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('5'))

  validateDisplay('5')
})
test('chained operators', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateDisplay('9')
})
test('make second calculation', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  userEvent.click(getButton('2'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  validateDisplay('4')
})
test('chain operator after equals', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  validateDisplay('8')
})
test('using keyboard', () => {
  render(<Calculator />)
  userEvent.type(document.body, '1')
  userEvent.type(document.body, '+')
  userEvent.type(document.body, '3')
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
  userEvent.type(document.body, '20')
  validateDisplay('20')
  userEvent.type(document.body, '+')
  userEvent.type(document.body, '400')
  validateDisplay('400')
  userEvent.type(document.body, '=')
  validateDisplay('420')
})
describe('decimals', () => {
  test('operand 1, decimal greater than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '1.3')

    validateDisplay('1.3')
  })
  test('operand 1, decimal less than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '0.4')
    validateDisplay('0.4')
  })
  test('operand 2, decimal greater than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '1')
    userEvent.type(document.body, '+')
    userEvent.type(document.body, '2.5')
    validateDisplay('2.5')
    userEvent.type(document.body, '=')
    validateDisplay('3.5')
  })
  test('operand 2, decimal less than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '1')
    userEvent.type(document.body, '+')
    userEvent.type(document.body, '0.5')
    validateDisplay('0.5')
    userEvent.type(document.body, '=')
    validateDisplay('1.5')
  })
  test('decimals with zeroes in', () => {
    render(<Calculator />)
    userEvent.type(document.body, '0.10')
    expect(screen.getByRole('status')).toHaveValue('0.10')
    userEvent.type(document.body, '5')
    validateDisplay('0.105')
  })
})
test('reset', () => {
  render(<Calculator />)
  userEvent.type(document.body, '10')
  userEvent.type(document.body, '-')
  userEvent.type(document.body, '2')

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
