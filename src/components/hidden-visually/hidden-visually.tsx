import { AllHTMLAttributes, ElementType, ReactNode } from 'react'

import { hiddenVisually } from './hidden-visually.css'

type Props = Pick<AllHTMLAttributes<HTMLElement>, 'htmlFor'> & {
  children: ReactNode
  component?: ElementType
}
export function HiddenVisually({
  component: Component = 'span',
  children,
  ...props
}: Props): JSX.Element {
  return (
    <Component className={hiddenVisually} {...props}>
      {children}
    </Component>
  )
}
