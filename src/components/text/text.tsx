import { Box, BoxProps } from '..'
import { ElementType, ReactNode } from 'react'

type Props = Pick<BoxProps, 'aria-hidden'> & {
  transform?: BoxProps['textTransform']
  size?: BoxProps['fontSize']
  spacing?: BoxProps['letterSpacing']
  component?: ElementType
  id?: string
  children: ReactNode
}
export function Text({
  component = 'span',
  transform,
  children,
  size,
  spacing,
  ...props
}: Props): JSX.Element {
  return (
    <Box
      component={component}
      textTransform={transform}
      fontSize={size}
      letterSpacing={spacing}
      {...props}
    >
      {children}
    </Box>
  )
}
