import * as styles from './grid.css'

import { Box, BoxProps } from '..'

type Props = Pick<BoxProps, 'children'>
export function Grid({ children }: Props): JSX.Element {
  return <Box className={styles.grid}>{children}</Box>
}
