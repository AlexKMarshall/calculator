import * as styles from './cover.css'

import { Box, BoxProps } from '..'

type Props = Pick<BoxProps, 'children'>
export function Cover({ children }: Props): JSX.Element {
  return <Box className={styles.cover}>{children}</Box>
}
