import Link from 'next/link'

import { useCallback, useContext } from 'react'

import { useLanguage } from '../../../pageProvider/Language'

import Accordion from '../../Accordion'

import { HeaderReducerContext } from '../Provider'

export default function HeaderLinks() {
  const { headerLinks } = useLanguage()
  const reduceHeaderState = useContext(HeaderReducerContext)

  const clickAction = useCallback(() => {
    reduceHeaderState(false)
  }, [reduceHeaderState])

  return (
    <Accordion>
      {(headerLinks || []).map(
        ({ label: categoryTitle, links: categoryLinks }, categoryIndex) => (
          <Accordion.Item open key={categoryIndex}>
            <Accordion.Header>{categoryTitle}</Accordion.Header>
            <div className='list-set ms-3'>
              {(categoryLinks || []).map(({ href, label }) => (
                <Link key={href} href={href} passHref>
                  <a href={href} onClick={clickAction} className='d-block '>
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </Accordion.Item>
        )
      )}
    </Accordion>
  )
}
