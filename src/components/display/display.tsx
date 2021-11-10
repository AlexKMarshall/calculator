import * as styles from './display.css'

import { Box } from '..'
import { ReactNode } from 'react'

type Props = { children: ReactNode }
export function Display({ children }: Props): JSX.Element {
  return (
    <Box component="output" className={styles.display}>
      {children}
    </Box>
  )
}
