import { globalStyle } from '@vanilla-extract/css'

globalStyle('*, *:after, *:before', {
  boxSizing: 'border-box',
  margin: 0,
})

globalStyle(`ul[role='list'], ol[role='list']`, { listStyle: 'none' })

globalStyle('body', {
  minHeight: '100vh',
  textRendering: 'optimizeSpeed',
  lineHeight: 1.5,
})

globalStyle('a:not([class])', {
  textDecorationSkipInk: 'auto',
})

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
})

globalStyle('input, button, textarea, select', {
  font: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',
})

globalStyle('img, svg', {
  display: 'block',
})

globalStyle('html:focus-within', {
  '@media': {
    'prefers-reduced-motion: reduce': {
      scrollBehavior: 'auto',
    },
  },
})

globalStyle('*, *::before, *::after', {
  '@media': {
    'prefers-reduced-motion: reduce': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important',
      scrollBehavior: 'auto',
    },
  },
})
