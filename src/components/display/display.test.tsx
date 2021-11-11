import { render, screen } from '@testing-library/react'

import { Display } from '.'

test('it renders formatted value', () => {
  const value = 1591231
  const formatter = new Intl.NumberFormat().format
  const formattedValue = formatter(value)
  render(<Display value={value} formatter={formatter} />)

  expect(screen.getByRole('status')).toHaveValue(formattedValue)
})
