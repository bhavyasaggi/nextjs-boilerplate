/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.scss'

import { useEffect } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import NProgress from 'nprogress'

import AlertProvider from '../pageProviders/Alert'
import LanguageProvider from '../pageProviders/Language'

import ErrorBoundary from '../components/ErrorBoundary'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// initialize nprogress
NProgress.configure({
  showSpinner: false,
  template: '<div role="bar"></div>',
})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function trackRouteChange(urlPath) {
  window.gtag('config', `${GA_ID}`, {
    page_path: urlPath,
  })
}

async function registerServiceWorker() {
  if ('serviceWorker' in window.navigator) {
    const register = await window.navigator.serviceWorker.register(
      `${SITE_URL}/service-worker.js`
    )
    register.update()
  }
}

export default function RootApp({ Component, pageProps, err }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', trackRouteChange)
    window.addEventListener('load', registerServiceWorker)
    return () => {
      window.removeEventListener('load', registerServiceWorker)
      router.events.off('routeChangeComplete', trackRouteChange)
    }
  }, [router.events])

  return (
    <ErrorBoundary>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>
      <LanguageProvider value={pageProps.localeStrings}>
        <AlertProvider>
          <Component {...pageProps} err={err} />
        </AlertProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
