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
      <main>
        <h1>Calc</h1>

        <Calculator />
      </main>
    </>
  )
}

export default Home
