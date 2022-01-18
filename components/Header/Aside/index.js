import classNames from 'classnames'

import { useContext } from 'react'
import IconClose from 'bootstrap-icons/icons/x-circle.svg'

import Image from '../../Image'

import { HeaderValueContext, HeaderReducerContext } from '../Provider'

import logo from '../../../public/logo.jpg'

import styles from './styles.module.scss'

export default function HeaderAside({ children }) {
  const headerState = useContext(HeaderValueContext)
  const reduceHeaderState = useContext(HeaderReducerContext)
  return (
    <div
      className={classNames(
        'position-fixed',
        'position-wrap',
        'w-100',
        'h-100',
        styles.aside,
        { 'd-none': !headerState }
      )}
      role='none'
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          reduceHeaderState(false)
        }
      }}
    >
      <div
        className={classNames(
          'mr-0',
          'ms-auto',
          'd-flex',
          'flex-column',
          'bg-white',
          'overflow-hidden',
          styles.offCanvas
        )}
      >
        <div className='mb-1 border border-top-0 border-start-0 border-end-0 pt-3 pb-3 ps-3 pe-3 d-flex align-items-center justify-content-between flex-shrink-0'>
          <Image src={logo} alt='Logo' width='48' height='48' />
          <IconClose
            width='24'
            height='24'
            className='text-secondary cursor-pointer'
            onClick={() => reduceHeaderState(false)}
          />
        </div>
        <div className={classNames('flex-grow-1', styles.offBody)}>
          {children}
        </div>
      </div>
    </div>
  )
}
