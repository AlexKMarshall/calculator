import { render, screen } from '@testing-library/react'

import { Calculator } from './calculator'
import userEvent from '@testing-library/user-event'

const getButton = (key: string) => screen.getByRole('button', { name: key })

const formatter = new Intl.NumberFormat().format
const validateResult = (result: number) =>
  expect(screen.getByRole('status')).toHaveValue(formatter(result))

test('addition', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  validateResult(13)
})

test('subtraction', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('8'))
  userEvent.click(getButton('-'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateResult(5)
})
test('multiplication', () => {
  render(<Calculator />)
  userEvent.click(getButton('2'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('x'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateResult(60)
})
test('division', () => {
  render(<Calculator />)
  userEvent.click(getButton('8'))
  userEvent.click(getButton('/'))
  userEvent.click(getButton('4'))
  userEvent.click(getButton('='))

  validateResult(2)
})
test('no leading zeros operand1', () => {
  render(<Calculator />)
  userEvent.click(getButton('0'))
  userEvent.click(getButton('3'))

  validateResult(3)
})
test('no leading zeros operand2', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('5'))

  validateResult(5)
})
test('chained operators', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  validateResult(9)
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

  validateResult(4)
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

  validateResult(8)
})
test('using keyboard', () => {
  render(<Calculator />)
  userEvent.type(document.body, '1')
  userEvent.type(document.body, '+')
  userEvent.type(document.body, '3')
  userEvent.type(document.body, '=')

  validateResult(4)
})
test('large numbers', () => {
  render(<Calculator />)
  userEvent.type(document.body, '123456789')

  validateResult(123456789)
})
