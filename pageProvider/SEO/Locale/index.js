import { useRouter } from 'next/router'

import Head from 'next/head'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default function SEOLocale() {
  const { pathname, defaultLocale, locales } = useRouter()
  if (!locales || !locales.length) {
    return null
  }
  return (
    <Head>
      {locales.map((locale) => {
        const localeString = defaultLocale === locale ? '' : `/{locale}`
        const localeHref =
          `${SITE_URL}${localeString}${pathname}`.replace(/\/+$/, '') ||
          `${SITE_URL}/`
        return (
          <link
            key={locale}
            hrefLang={locale}
            href={localeHref}
            rel='alternate'
          />
        )
      })}
    </Head>
  )
}
