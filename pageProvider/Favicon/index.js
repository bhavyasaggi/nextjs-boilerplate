import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import { useAlerts } from '../Alert/Provider'

const DEFAULT_FAVICON = '/favicon.ico'

export default function FaviconProvider({ children }) {
  const [favicon, setFavicon] = useState(DEFAULT_FAVICON)

  const router = useRouter()

  const alerts = useAlerts()

  const alertCount = (alerts || []).length

  useEffect(() => {
    const createFaviconLoading = () => {
      setFavicon('/favicon/loading.png')
    }
    const createFaviconDone = () => {
      if (alertCount > 0) {
        setFavicon('/favicon/alert.png')
      } else {
        setFavicon(DEFAULT_FAVICON)
      }
    }
    createFaviconDone()
    router.events.on('routeChangeStart', createFaviconLoading)
    router.events.on('routeChangeComplete', createFaviconDone)
    router.events.on('routeChangeError', createFaviconDone)
    return () => {
      router.events.on('routeChangeError', createFaviconDone)
      router.events.on('routeChangeComplete', createFaviconDone)
      router.events.on('routeChangeStart', createFaviconLoading)
    }
  }, [router.events, alertCount])

  return (
    <>
      <Head>
        <link rel='icon' href={favicon} />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </Head>
      {children}
    </>
  )
}
