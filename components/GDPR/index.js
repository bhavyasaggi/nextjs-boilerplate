import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'

import { useLanguage } from '../../pageProvider/Language'

import styles from './styles.module.scss'

export default function GDPR() {
  const { gdpr, gdprAccept } = useLanguage()
  const [show, setShow] = useState(false)

  const acceptGDPR = useCallback(() => {
    window.localStorage.setItem('GDPR_ACCEPT', 'TRUE')
    setShow(false)
  }, [])

  useEffect(() => {
    if (window.localStorage) {
      setShow(window.localStorage.getItem('GDPR_ACCEPT') !== 'TRUE')
    }
  }, [])

  return (
    <div
      className={classNames(
        'pt-1',
        'pb-1',
        'ps-3',
        'pe-3',
        'd-flex',
        'align-items-center',
        'small',
        'text-white',
        'bg-secondary',
        'shadow',
        styles.gdpr,
        {
          [styles.active]: show,
        }
      )}
    >
      <div className='flex-grow-1'>{gdpr}</div>
      <Button
        size='sm'
        onClick={acceptGDPR}
        variant='outline-white'
        className='ms-3 flex-shrink-0 flex-grow-0'
      >
        {gdprAccept}
      </Button>
    </div>
  )
}
