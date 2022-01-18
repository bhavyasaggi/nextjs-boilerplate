/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.scss'

import Head from 'next/head'
import Router from 'next/router'

import NProgress from 'nprogress'

import PageProvider from '../pageProvider'

// initialize nprogress
NProgress.configure({
  showSpinner: false,
  template: '<div role="bar"></div>',
})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function RootApp({ Component, pageProps, err }) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>
      <PageProvider pageProps={pageProps} errProps={err}>
        <Component {...pageProps} err={err} />
      </PageProvider>
    </>
  )
}
