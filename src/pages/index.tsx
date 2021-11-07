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
      <main>Calculator</main>
    </>
  )
}

export default Home
