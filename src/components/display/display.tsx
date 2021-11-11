import * as styles from './display.css'

import { Box } from '..'
import { ReactNode } from 'react'

type Props = {
  value: number
  formatter?: (value: number) => string
}
export function Display({
  value,
  formatter = (val) => val.toString(),
}: Props): JSX.Element {
  const formattedValue = formatter(value)

  return (
    <Box component="output" className={styles.display}>
      {formattedValue}
    </Box>
  )
}
