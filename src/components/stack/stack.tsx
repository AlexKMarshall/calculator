import * as styles from './stack.css'

import { Box, BoxProps } from '..'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  space?: BoxProps['gap']
  component?: BoxProps['component']
}
export function Stack({
  children,
  space = 's',
  component,
}: Props): JSX.Element {
  return (
    <Box gap={space} className={styles.stack} component={component}>
      {children}
    </Box>
  )
}
