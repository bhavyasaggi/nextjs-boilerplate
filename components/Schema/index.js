import Head from 'next/head'

export default function Schema({ id, value }) {
  return (
    <Head>
      <script
        id={id}
        key={id}
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(value || {}) }}
      />
    </Head>
  )
}
