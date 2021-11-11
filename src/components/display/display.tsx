import * as styles from './display.css'

import { Box } from '..'

type Props = {
  value: string
}
export function Display({ value }: Props): JSX.Element {
  return (
    <Box component="output" className={styles.display}>
      {value}
    </Box>
  )
}
