import CONSTANTS_GA from '../../../pageData/common/constants/ga.yml'

const { actionConsoleError, categoryErrorGlobal, labelNA } = CONSTANTS_GA

export default function errorAction(err) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }
  const errorLabel =
    err.stack ||
    `${err.name}[ ${err.message} ] \n<${err.filename}>:${
      err.lineNumber || err.lineno
    }:${err.columnNumber || err.colno}` ||
    labelNA
  window.gtag('event', actionConsoleError, {
    event_category: categoryErrorGlobal,
    event_label: errorLabel,
    value: 0,
  })
}
