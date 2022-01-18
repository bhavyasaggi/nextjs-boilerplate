/* eslint-disable @next/next/no-img-element */
// import * as Sentry from '@sentry/nextjs'

import errorAction from '../pageProvider/Error/Boundary/errorAction'

const RootError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592.
    // As a workaround, pass err via _app.js
    // Sentry.captureException(err)
    errorAction(err)
  }

  return `500 - ${statusCode}`
}

RootError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = {
    hasGetInitialPropsRun: true,
    statusCode:
      // eslint-disable-next-line no-nested-ternary
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404,
  }

  if (err) {
    // Sentry.captureException(err)
    // await Sentry.flush(2000)
    errorAction(err)
    return errorInitialProps
  }

  // Sentry.captureException(
  //   new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  // )
  // await Sentry.flush(2000)
  errorAction(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  )
  return errorInitialProps
}

export default RootError
