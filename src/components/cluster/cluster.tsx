import * as styles from './cluster.css'

import { Box, BoxProps } from '..'

import { ReactNode } from 'react'

type Props = Pick<BoxProps, 'aria-labelledby'> & {
  gap?: BoxProps['gap']
  justify?: BoxProps['justifyContent']
  align?: BoxProps['alignItems']
  component?: BoxProps['component']
  wrapReverse?: true
  children: ReactNode
}
export function Cluster({
  children,
  justify,
  align,
  wrapReverse,
  ...props
}: Props): JSX.Element {
  return (
    <Box
      className={styles.cluster({ wrap: wrapReverse && 'reverse' })}
      justifyContent={justify}
      alignItems={align}
      {...props}
    >
      {children}
    </Box>
  )
}
