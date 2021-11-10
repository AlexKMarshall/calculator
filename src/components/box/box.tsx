import * as styles from './box.css'

import { ElementType, ReactNode } from 'react'
import clsx, { ClassValue } from 'clsx'

import { sprinkles } from 'src/styles/sprinkles.css'

type Sprinkles = Parameters<typeof sprinkles>[0]

export type BoxProps = Sprinkles & {
  children: ReactNode
  component?: ElementType
  className?: ClassValue
}

export function Box({
  component: Component = 'div',
  className: classNameProp,
  children,
  ...props
}: BoxProps): JSX.Element {
  const sprinkleProps: Record<string, unknown> = {}

  for (const key in props) {
    if (sprinkles.properties.has(key as keyof Sprinkles)) {
      sprinkleProps[key] = props[key as keyof typeof props]
    }
  }

  const sprinkleClassNames = sprinkles(sprinkleProps)
  const className = clsx(styles.box, classNameProp, sprinkleClassNames)

  return <Component className={className}>{children}</Component>
}
