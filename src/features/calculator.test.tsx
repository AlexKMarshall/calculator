import { Calculator, NumberKey } from './calculator'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

const keys = {
  '1': {},
  '+': {},
  '=': {},
}

type Key = NumberKey | '=' | '+'

const getButton = (key: Key) => screen.getByRole('button', { name: key })

test('calculate 1 + 2', () => {
  render(<Calculator />)
  userEvent.click(getButton('1'))
  userEvent.click(getButton('+'))
  userEvent.click(getButton('2'))
  userEvent.click(getButton('='))

  expect(screen.getByRole('status')).toHaveValue('3')
})
