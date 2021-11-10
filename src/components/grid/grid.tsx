import * as styles from './grid.css'

import { Box, BoxProps } from '..'

type Props = Pick<BoxProps, 'children'> & {
  gutter: BoxProps['gap']
}
export function Grid({ gutter: gap = 's', children }: Props): JSX.Element {
  return (
    <Box className={styles.grid} gap={gap}>
      {children}
    </Box>
  )
}
