import * as styles from './display.css'

import { Box, BoxProps } from '..'

type Props = {
  value: string
  space?: BoxProps['padding']
}
export function Display({ value, space: padding }: Props): JSX.Element {
  return (
    <Box component="output" className={styles.display} padding={padding}>
      {value}
    </Box>
  )
}
