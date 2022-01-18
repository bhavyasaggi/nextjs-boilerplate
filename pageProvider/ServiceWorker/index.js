import { useEffect } from 'react'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

async function registerServiceWorker() {
  if ('serviceWorker' in window.navigator) {
    const register = await window.navigator.serviceWorker.register(
      `${SITE_URL}/service-worker.js`
    )
    register.update()
  }
}

export default function ServiceWorkerProvider({ children }) {
  useEffect(() => {
    window.addEventListener('load', registerServiceWorker)
    return () => {
      window.removeEventListener('load', registerServiceWorker)
    }
  }, [])

  return children
}
