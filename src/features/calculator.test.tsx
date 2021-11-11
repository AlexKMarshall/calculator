import { render, screen } from '@testing-library/react'

import { Calculator } from './calculator'
import userEvent from '@testing-library/user-event'

const getButton = (key: string) => screen.getByRole('button', { name: key })

const formatter = (val: number) => val.toString()
const validateResult = (result: string) =>
  expect(screen.getByRole('status')).toHaveValue(result)

test('addition', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  validateResult('13')
})

test('subtraction', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('8'))
  userEvent.click(getButton('-'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateResult('5')
})
test('multiplication', () => {
  render(<Calculator />)
  userEvent.click(getButton('2'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('x'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateResult('60')
})
test('division', () => {
  render(<Calculator />)
  userEvent.click(getButton('8'))
  userEvent.click(getButton('/'))
  userEvent.click(getButton('4'))
  userEvent.click(getButton('='))

  validateResult('2')
})
test('no leading zeros operand1', () => {
  render(<Calculator />)
  userEvent.click(getButton('0'))
  userEvent.click(getButton('3'))

  validateResult('3')
})
test('no leading zeros operand2', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('5'))

  validateResult('5')
})
test('chained operators', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateResult('9')
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

  validateResult('4')
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

  validateResult('8')
})
test('using keyboard', () => {
  render(<Calculator />)
  userEvent.type(document.body, '1')
  userEvent.type(document.body, '+')
  userEvent.type(document.body, '3')
  userEvent.type(document.body, '=')

  validateResult('4')
})
test('large numbers', () => {
  render(<Calculator />)
  userEvent.type(document.body, '123456789')

  validateResult('123,456,789')
})
test('numbers with zeros in', () => {
  render(<Calculator />)
  userEvent.type(document.body, '20')
  validateResult('20')
  userEvent.type(document.body, '+')
  userEvent.type(document.body, '400')
  validateResult('400')
  userEvent.type(document.body, '=')
  validateResult('420')
})
describe('decimals', () => {
  test('operand 1, decimal greater than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '1.3')

    validateResult('1.3')
  })
  test('operand 1, decimal less than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '0.4')
    validateResult('0.4')
  })
  test('operand 2, decimal greater than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '1')
    userEvent.type(document.body, '+')
    userEvent.type(document.body, '2.5')
    validateResult('2.5')
    userEvent.type(document.body, '=')
    validateResult('3.5')
  })
  test('operand 2, decimal less than 1', () => {
    render(<Calculator />)
    userEvent.type(document.body, '1')
    userEvent.type(document.body, '+')
    userEvent.type(document.body, '0.5')
    validateResult('0.5')
    userEvent.type(document.body, '=')
    validateResult('1.5')
  })
  test('decimals with zeroes in', () => {
    render(<Calculator />)
    userEvent.type(document.body, '0.10')
    expect(screen.getByRole('status')).toHaveValue('0.10')
    userEvent.type(document.body, '5')
    validateResult('0.105')
  })
})
