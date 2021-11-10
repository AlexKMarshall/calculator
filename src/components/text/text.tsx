import { Box, BoxProps } from '..'
import { ElementType, ReactNode } from 'react'

type Props = Pick<BoxProps, 'aria-hidden'> & {
  transform?: BoxProps['textTransform']
  component?: ElementType
  children: ReactNode
}
export function Text({
  component = 'span',
  transform,
  children,
  ...props
}: Props): JSX.Element {
  return (
    <Box component={component} textTransform={transform} {...props}>
      {children}
    </Box>
  )
}
