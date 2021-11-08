import { Calculator, NumberKey, OperatorKey } from './calculator'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

type Key = NumberKey | OperatorKey | '='

const getButton = (key: Key) => screen.getByRole('button', { name: key })

test('addition', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('13')
})

test('subtraction', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('8'))
  userEvent.click(getButton('-'))
  userEvent.click(getButton('1'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('5')
})
test('multiplication', () => {
  render(<Calculator />)
  userEvent.click(getButton('2'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('*'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('60')
})
test('division', () => {
  render(<Calculator />)
  userEvent.click(getButton('8'))
  userEvent.click(getButton('/'))
  userEvent.click(getButton('4'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('2')
})
test('no leading zeros operand1', () => {
  render(<Calculator />)
  userEvent.click(getButton('0'))
  userEvent.click(getButton('3'))

  expect(screen.getByRole('status')).toHaveValue('3')
})
test('no leading zeros operand2', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('0'))
  userEvent.click(getButton('5'))

  expect(screen.getByRole('status')).toHaveValue('5')
})
test('chained operators', () => {
  render(<Calculator />)
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('9')
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

  expect(screen.getByRole('status')).toHaveValue('4')
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

  expect(screen.getByRole('status')).toHaveValue('8')
})
test('using keyboard', () => {
  render(<Calculator />)
  userEvent.type(document.body, '1')
  userEvent.type(document.body, '+')
  userEvent.type(document.body, '3')
  userEvent.type(document.body, '=')

  expect(screen.getByRole('status')).toHaveValue('4')
})
