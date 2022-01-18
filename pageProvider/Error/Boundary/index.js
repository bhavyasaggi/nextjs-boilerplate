import { Fragment, Component } from 'react'

import errorAction from './errorAction'

class RawErrorBoundary extends Component {
  componentDidMount() {
    window.addEventListener('error', errorAction)
  }

  componentDidCatch(error, errorInfo) {
    errorAction(error, errorInfo)
  }

  componentWillUnmount() {
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
