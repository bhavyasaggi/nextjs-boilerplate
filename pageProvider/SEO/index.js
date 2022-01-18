import Head from 'next/head'
import { useRouter } from 'next/router'

import { useLanguage } from '../Language'

import SEOLocale from './Locale'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default function SEOProvider({ children }) {
  const { pathname, defaultLocale, locale } = useRouter()

  const { title, description, image = '/logo.png' } = useLanguage()

  const localeString = defaultLocale === locale ? '' : `/${locale}`

  const canonical =
    `${SITE_URL}${localeString}${pathname}`.replace(/\/+$/, '') ||
    `${SITE_URL}/`

  const imagePath = `${SITE_URL}${image}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:type' content='website' />
        <meta name='og:title' property='og:title' content={title} />
        <meta
          name='og:description'
          property='og:description'
          content={description}
        />
        <meta property='og:site_name' content={SITE_URL} />
        <meta property='og:url' content={canonical} />
        <meta property='og:locale' content={locale} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:site' content={SITE_URL} />
        <meta property='og:image' content={imagePath} />
        <meta name='twitter:image' content={imagePath} />
        <link rel='canonical' href={canonical} />
        <base
          href={SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`}
          target='_blank'
        />
        <script
          id='web-schema'
          type='application/ld+json'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@type': 'WebPage',
              headline: title,
              description,
              publisher: {
                '@type': 'Organization',
                logo: {
                  '@type': 'ImageObject',
                  url: imagePath,
                },
              },
              url: canonical,
              '@context': 'https://schema.org',
            }),
          }}
        />
      </Head>
      <SEOLocale />
      {children}
    </>
  )
}
