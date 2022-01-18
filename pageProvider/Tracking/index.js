import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import CONSTANTS_GA from '../../pageData/common/constants/ga.yml'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const {
  actionUserClick,
  categoryClickGlobal,
  categoryClickInput,
  categoryClickButton,
  categoryClickHref,
  labelNA,
} = CONSTANTS_GA

const analyticsScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}',{page_path:window.location.pathname});
`

const analyticsData = [
  {
    tag: 'input, select',
    category: categoryClickInput,
  },
  {
    tag: 'summary, button, .btn',
    category: categoryClickButton,
  },
  {
    tag: 'a[href]',
    category: categoryClickHref,
  },
]

function trackRouteChange(urlPath) {
  window.gtag('config', `${GA_ID}`, {
    page_path: urlPath,
  })
}

function trackClick({ target: element }) {
  let analyticsOptions = null

  analyticsData.some(({ tag, category, label, value }) => {
    const elementClosest = element.closest(tag)
    if (!elementClosest) {
      return false
    }
    const { title, ariaLabel, textContext, innerText } = elementClosest
    const eventCategory = category || categoryClickGlobal
    const eventLabel =
      label ||
      title ||
      ariaLabel ||
      (textContext || innerText || '').substr(0, 32) ||
      labelNA
    const eventValue = value || 0
    analyticsOptions = {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    }
    return true
  })

  if (analyticsOptions) {
    window.gtag('event', actionUserClick, analyticsOptions)
  }
}

export default function TrackingProvider({ children }) {
  const router = useRouter()

  useEffect(() => {
    document.addEventListener('click', trackClick)
    return () => {
      document.removeEventListener('click', trackClick)
    }
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', trackRouteChange)
    return () => {
      router.events.off('routeChangeComplete', trackRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          id='ga-analytics'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: analyticsScript }}
        />
      </Head>
      {children}
    </>
  )
}
