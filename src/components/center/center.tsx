import * as styles from './center.css'

import { Box, BoxProps } from '..'

type Props = Pick<BoxProps, 'component' | 'children'>
export function Center({ children, ...props }: Props): JSX.Element {
  return (
    <Box {...props} className={styles.center}>
      {children}
    </Box>
  )
}
