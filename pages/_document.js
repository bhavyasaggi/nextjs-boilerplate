import Document, { Html, Head, Main, NextScript } from 'next/document'

class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='application-name' content='NextJS Boilerplate' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta
            name='apple-mobile-web-app-title'
            content='NextJS Boilerplate'
          />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#da2f47' />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RootDocument
