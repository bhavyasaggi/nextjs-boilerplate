/* eslint-disable no-restricted-globals */

const cacheName = 'nextjs-boilerplate'
const initFilesToCache = ['/', '/favicon.ico', '/site.webmanifest']
const acceptCacheUrls = [
  /(anifest)\.js$/i,
  /\/_next\/(data)\/.+\.([\w]+?)$/i,
  /\/_next\/(.+?)\/(.+?)\/.+\.(?:[\w]+?)$/i,
  /^(?:.*)\/(?:[^.]+)$/,
]
const rejectCacheUrls = [
  /\/_next\/image\?url=.+$/i,
  /\.(?:jpg|jpeg|gif|png|svg|webp)$/i,
  /[?#]/i,
]

const isLocal = () =>
  ['localhost', '127.0.0.1'].includes(self.location.hostname)

const offlineResponse = () =>
  new Response(
    '<html><head><title>Offline</title></head><body><h1>Unable to Connect. You may be Offline!</h1></body></html>',
    {
      headers: { 'Content-Type': 'text/html' },
    }
  )

function swFetch(request, { timeout, cacheBox }) {
  let isOver = false
  // Premptive cache Fetch
  const fetchRequest = fetch(request)
  const cacheFetch = caches.match(request)
  const cacheBoxGet = caches.open(cacheBox)
  const cacheBoxPut = (response) =>
    cacheBoxGet.then((cB) => cB.put(request, response))
  return new Promise((resolve, reject) => {
    // Ticker
    const tickerCb = () => {
      cacheFetch.then((response) => {
        if (!isOver && response) {
          isOver = true
          resolve(response)
        }
      })
    }
    const ticker = setTimeout(tickerCb, timeout)
    //
    const fetchSuccess = (response) => {
      cacheBoxPut(response.clone())
      if (isOver) {
        return
      }
      isOver = true
      resolve(response)
    }
    //
    const fetchFailure = (err) => {
      cacheFetch.then((response) => {
        if (isOver) {
          return
        }
        isOver = true
        if (response) {
          resolve(response)
        } else {
          reject(err)
        }
      })
    }
    //
    fetchRequest
      .then(fetchSuccess)
      .catch(fetchFailure)
      .finally(() => {
        clearTimeout(ticker)
      })
  })
}

self.addEventListener('install', (e) => {
  self.skipWaiting()
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(initFilesToCache))
      .catch(() => {})
  )
})

self.addEventListener('activate', (e) => {
  const isLocalValue = isLocal()
  const keyMap = (key) =>
    isLocalValue || !key.startsWith(cacheName) ? caches.delete(key) : null
  e.waitUntil(
    caches
      .keys()
      .then((keyList) => keyList.map(keyMap))
      .then((keyPromises) => Promise.all(keyPromises))
  )
  return self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const {
    request,
    request: { url: requestUrl, method: requestMethod },
  } = e

  if (
    isLocal() ||
    requestMethod !== 'GET' ||
    !/^(http|https):\/\//i.test(requestUrl) ||
    new URL(requestUrl).origin !== self.location.origin
  ) {
    return
  }

  if (rejectCacheUrls.some((rejectRegex) => rejectRegex.test(requestUrl))) {
    return
  }

  let cacheBox = cacheName
  const isCacheUrl = acceptCacheUrls.some((acceptRegex) => {
    const cacheMatch = acceptRegex.exec(requestUrl)
    cacheBox = `${cacheName}-${(cacheMatch || []).slice(1).join('-')}`
    return cacheMatch
  })

  if (!isCacheUrl) {
    return
  }

  e.respondWith(
    swFetch(request, { timeout: 3000, cacheBox }).catch(offlineResponse)
  )
})
