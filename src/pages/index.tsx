import {
  Center,
  Cluster,
  Cover,
  Stack,
  Text,
  ThemeSwitch,
} from 'src/components'

import { Calculator } from 'src/features/calculator'
import Head from 'next/head'
import type { NextPage } from 'next'

const Home: NextPage = () => {
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
            <Cluster
              gap="l"
              component="header"
              justify="space-between"
              align="baseline"
              wrapReverse
            >
              <Text component="h1" size="m">
                calc
              </Text>
              <ThemeSwitch />
            </Cluster>

            <Calculator />
          </Stack>
        </Center>
      </Cover>
    </>
  )
}

export default Home
