import * as styles from './stack.css'

import { Box, BoxProps } from '..'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  space: BoxProps['gap']
}
export function Stack({ children, space = 's' }: Props): JSX.Element {
  return (
    <Box gap={space} className={styles.stack}>
      {children}
    </Box>
  )
}
