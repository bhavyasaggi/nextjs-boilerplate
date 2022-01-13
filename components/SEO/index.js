import Head from 'next/head'
import { useRouter } from 'next/router'

import SEOSchema from './Schema'
import SEOLocale from './Locale'

import routePrefix from '../../utils/routePrefix'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const defaultImage = '/logo.png'
const defaultTitle = 'PDFvise - Online PDF tools for free.'
const defaultDescription =
  'PDFvise provides free and secure platform for your PDF needs without uploading, with no watermarks, & completely free!.'

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
}) {
  const { pathname, defaultLocale, locale } = useRouter()
  const localeString = routePrefix(defaultLocale === locale ? '' : locale)

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
      </Head>
      <SEOLocale />
      <SEOSchema
        id='web-schema'
        schema={{
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
        }}
      />
    </>
  )
}
