import * as styles from './grid.css'

import { Box, BoxProps } from '..'

type Props = Pick<BoxProps, 'children' | 'gap' | 'padding'>
export function Grid({
  gap = 's',
  padding = 's',
  children,
}: Props): JSX.Element {
  return (
    <Box className={styles.grid} gap={gap} padding={padding}>
      {children}
    </Box>
  )
}
