import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { darkTheme } from 'src/styles/theme.css'

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Spartan:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className={darkTheme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
