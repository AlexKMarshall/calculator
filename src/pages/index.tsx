import { Center, Cover, Stack, Text } from 'src/components'
import { darkTheme, highContrastTheme, lightTheme } from 'src/styles/theme.css'
import { useEffect, useState } from 'react'

import { Calculator } from 'src/features/calculator'
import Head from 'next/head'
import type { NextPage } from 'next'

type Theme = 'dark' | 'light' | 'highContrast'

const themeClasses = {
  dark: darkTheme,
  light: lightTheme,
  highContrast: highContrastTheme,
}

const Home: NextPage = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    document.body.classList.forEach((c) => {
      document.body.classList.remove(c)
    })

    const themeClass = themeClasses[theme]
    document.body.classList.add(themeClass)
  }, [theme])

  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta
          name="description"
          content="Simple calculator app made with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cover>
        <Center>
          <Stack space="2xl">
            <header>
              <Text component="h1" size="m">
                calc
              </Text>
              <section aria-labelledby="theme-switch">
                <p id="theme-switch">Theme {theme}</p>
                <label>
                  1
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === 'dark'}
                    onChange={() => setTheme('dark')}
                  />
                </label>
                <label>
                  2
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === 'light'}
                    onChange={() => setTheme('light')}
                  />
                </label>
                <label>
                  3
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === 'highContrast'}
                    onChange={() => setTheme('highContrast')}
                  />
                </label>
              </section>
            </header>

            <Calculator />
          </Stack>
        </Center>
      </Cover>
    </>
  )
}

export default Home
