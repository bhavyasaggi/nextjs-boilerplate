import Head from 'next/head'

export default function SEOSchema({ id, schema }) {
  return (
    <Head>
      <script
        id={id}
        key={id}
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema || {}) }}
      />
    </Head>
  )
}
