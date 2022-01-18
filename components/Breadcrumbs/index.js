import startCase from 'lodash/startCase'
import classNames from 'classnames'

import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Container from 'react-bootstrap/Container'

import IconHome from 'bootstrap-icons/icons/house.svg'

import Schema from '../Schema'

import styles from './styles.module.scss'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

const HOME_STRING = (
  <IconHome height='16' width='16' alt='Home' aria-label='Home' />
)

function BreadcrumbComponents({ paths = [] }) {
  return paths.map(({ value, href }, pathIndex) => {
    const key = `${pathIndex}-${href}`
    if (pathIndex === paths.length - 1) {
      return (
        <span
          key={key}
          className={classNames('text-ternary', styles.breadcrumbItem)}
        >
          {value}
        </span>
      )
    }
    return (
      <Link key={key} href={href} passHref>
        <a
          href={href}
          className={classNames(
            'text-decoration-none',
            'text-white',
            styles.breadcrumbItem
          )}
        >
          {value || HOME_STRING}
        </a>
      </Link>
    )
  })
}

export default function Breadcrumbs() {
  const { pathname } = useRouter()

  const pathData = useMemo(
    () =>
      pathname.split('/').map((pathItem, pathIndex, pathArray) => ({
        value: startCase(pathItem),
        href: `${pathArray.slice(0, pathIndex + 1).join('/')}` || '/',
      })),
    [pathname]
  )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pathData.map(
      ({ value: pathValue, href: pathHref }, pathIndex) => {
        if (pathIndex === pathData.length - 1) {
          return {
            '@type': 'ListItem',
            position: pathIndex + 1,
            name: pathValue,
          }
        }
        return {
          '@type': 'ListItem',
          position: pathIndex + 1,
          name: pathValue || 'Home',
          item: `${SITE_URL}${pathHref}`,
        }
      }
    ),
  }

  return (
    <div className='bg-secondary lh-1'>
      <Container
        className={classNames(
          'container',
          'pt-3',
          'pb-3',
          'small',
          'lh-1',
          'text-white',
          styles.breadcrumb
        )}
      >
        {pathData.length ? (
          <>
            <Schema id='breadcrumb-schema' value={schema} />
            <BreadcrumbComponents paths={pathData} />
          </>
        ) : null}
      </Container>
    </div>
  )
}
