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
  userEvent.click(getButton('*'))
  userEvent.click(getButton('3'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('6')
})
test('division', () => {
  render(<Calculator />)
  userEvent.click(getButton('8'))
  userEvent.click(getButton('/'))
  userEvent.click(getButton('4'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('2')
})
