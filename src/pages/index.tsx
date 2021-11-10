import { Center, Cover } from 'src/components'

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
        <Center component="main">
          <h1>Calc</h1>

          <Calculator />
        </Center>
      </Cover>
    </>
  )
}

export default Home
