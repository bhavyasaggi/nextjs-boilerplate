import { Fragment, Component } from 'react'

import { getAnalyticsLabel } from '../../utils/getAnalytics'
import errorAction from '../../utils/errorAction'

import CONSTANTS_GA from '../../pageData/common/constants/ga.yml'

function getAnalyticsOptions(element, selector) {
  const elementClosest = element.closest(selector)
  if (!elementClosest) {
    return null
  }

  const elementDataset = elementClosest.dataset
  const {
    actionUserClick,
    categoryClickGlobal,
    categoryClickInput,
    categoryClickButton,
    categoryClickHref,
    labelNA,
  } = CONSTANTS_GA

  let elementAction
  let elementCategory
  let elementLabel
  let elementValue
  switch (selector) {
    case '[data-analytics]':
      elementAction = elementDataset.analyticsAction
      elementCategory = elementDataset.analyticsCategory
      elementLabel = elementDataset.analyticsLabel
      elementValue = elementDataset.analyticsValue
      break
    case 'input, select':
      elementCategory = categoryClickInput
      break
    case 'button, .btn':
      elementCategory = categoryClickButton
      break

    case 'a[href]':
      elementCategory = categoryClickHref
      break
    default:
      elementCategory = categoryClickGlobal
      break
  }
  const numberValue = Number(elementValue)
  return [
    elementAction || actionUserClick,
    {
      event_category: elementCategory,
      event_label: elementLabel || getAnalyticsLabel(elementClosest) || labelNA,
      value: Number.isNaN(numberValue) ? 0 : numberValue,
    },
  ]
}

function clickAction({ target: element }) {
  let analyticsOptions = null
  if (
    [
      '[data-analytics]',
      'input, select',
      'summary, button, .btn',
      'a[href]',
    ].some((selector) => {
      analyticsOptions = getAnalyticsOptions(element, selector)
      return !!analyticsOptions
    })
  ) {
    const [eventAction, eventOptions] = analyticsOptions
    window.gtag('event', eventAction, eventOptions)
  }
}

class RawErrorBoundary extends Component {
  componentDidMount() {
    window.addEventListener('error', errorAction)
    document.addEventListener('click', clickAction)
  }

  componentDidCatch(error, errorInfo) {
    errorAction(error, errorInfo)
  }

  componentWillUnmount() {
    document.removeEventListener('click', clickAction)
    window.removeEventListener('error', errorAction)
  }

  render() {
    const { children } = this.props

    return children
  }
}

const ErrorBoundary =
  process.env.NODE_ENV === 'development' ? Fragment : RawErrorBoundary

export default ErrorBoundary
