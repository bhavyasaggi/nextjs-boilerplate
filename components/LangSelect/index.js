import Link from 'next/link'
import { useRouter } from 'next/router'

import Badge from 'react-bootstrap/Badge'

import langMap from '../../pageData/common/constants/language.yml'

export default function LangSelect() {
  const { pathname, locale, locales } = useRouter()

  if (!locale || !locales || !locales.length) {
    return null
  }

  return (
    <>
      {locales.map((altLocale, altLocaleIdx) => {
        const localeString = langMap[altLocale] || 'Language'
        return (
          <Link
            key={altLocaleIdx}
            href={pathname}
            locale={altLocale}
            passHref
            replace
          >
            <Badge
              as='a'
              bg='ternary'
              text='secondary'
              className='mt-1 mb-1 ms-1 me-1 border border-secondary text-decoration-none rounded cursor-pointer hover'
            >
              {localeString}
            </Badge>
          </Link>
        )
      })}
    </>
  )
}
