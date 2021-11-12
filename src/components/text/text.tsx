import { Box, BoxProps } from '..'
import { ElementType, ReactNode } from 'react'

type Props = Pick<BoxProps, 'aria-hidden'> & {
  transform?: BoxProps['textTransform']
  size?: BoxProps['fontSize']
  component?: ElementType
  children: ReactNode
}
export function Text({
  component = 'span',
  transform,
  children,
  size: fontSize,
  ...props
}: Props): JSX.Element {
  return (
    <Box
      component={component}
      textTransform={transform}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </Box>
  )
}
