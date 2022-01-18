import classNames from 'classnames'

import { useContext } from 'react'
import Link from 'next/link'

import Container from 'react-bootstrap/Container'

import IconMenu from 'bootstrap-icons/icons/list.svg'

import { HeaderReducerContext } from '../Provider'

import Image from '../../Image'

import logo from '../../../public/logo.jpg'

export default function HeaderBar() {
  const reduceHeaderState = useContext(HeaderReducerContext)
  return (
    <div className='pt-1 pb-1 lh-1 bg-white shadow'>
      <Container className='pt-1 pb-1 d-flex align-items-center justify-content-between'>
        <Link href='/' passHref>
          <Image
            loading='eager'
            src={logo}
            alt='Logo'
            width='48'
            height='48'
            className='cursor-pointer'
          />
        </Link>
        <IconMenu
          height='48'
          width='48'
          className={classNames(
            'ms-auto',
            'me-0',
            'text-secondary',
            'cursor-pointer'
          )}
          onClick={() => reduceHeaderState()}
        />
      </Container>
    </div>
  )
}
