import classNames from 'classnames'

import { useCallback, useEffect, useRef, memo } from 'react'

import IconClose from 'bootstrap-icons/icons/x-circle.svg'

import { useAlertDispatch } from '../Provider'

import styles from './styles.module.scss'

const idToDelay = (id) =>
  Math.sin(parseInt(id.replace(/[\W\s]/g, ''), 36)).toFixed(2)

const clearTimeout = (timeoutRef) => {
  if (timeoutRef) {
    window.clearTimeout(timeoutRef)
    // eslint-disable-next-line no-param-reassign
    timeoutRef = null
  }
}

function RawAlertElement({
  id,
  className,
  callback,
  dismiss,
  timeout,
  children,
}) {
  const alertDispatch = useAlertDispatch()
  const alertTimeoutRef = useRef(null)

  const timeoutMs = timeout * 1000
  const timeoutDelay = idToDelay(id)

  const execCallback = useCallback(() => {
    alertDispatch({ type: 'REMOVE', id })
    if (typeof callback === 'function') {
      callback(id)
    }
  }, [alertDispatch, callback, id])

  useEffect(() => {
    clearTimeout(alertTimeoutRef.current)
    if (dismiss) {
      alertTimeoutRef.current = window.setTimeout(execCallback, timeoutMs)
    }
    return () => {
      clearTimeout(alertTimeoutRef.current)
      execCallback()
    }
  }, [alertTimeoutRef, dismiss, timeoutMs, execCallback])

  return (
    <div
      data-dismiss={dismiss ? 'TRUE' : 'FALSE'}
      className={classNames(styles.alertElement, className)}
      style={{
        '--timeout-delay': `${timeoutDelay}s`,
        '--timeout': `${timeout}s`,
      }}
    >
      {children}
      <IconClose
        className={styles.alertClose}
        height='16'
        width='16'
        onClick={execCallback}
      />
    </div>
  )
}

const AlertElement = memo(RawAlertElement)

export default AlertElement
