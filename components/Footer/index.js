import { Col, Container, Row } from 'react-bootstrap'

import LangSelect from '../LangSelect'

import { useLanguage } from '../../pageProvider/Language'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default function Footer() {
  const {
    poweredTitle,
    languageTitle,
    aboutTitle,
    about,
    credits,
    quickLinksTitle,
    quickLinks,
  } = useLanguage()
  return (
    <div className='pt-5 pb-5 bg-white shadow'>
      <Container>
        <Row>
          <Col lg={6} className='mt-1 mb-1'>
            <Row>
              <Col as='h2' className='lead fw-bold'>
                {aboutTitle}
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col className='small'>
                <p className='text-justify'>{about}</p>
              </Col>
            </Row>
          </Col>
          <Col lg={3} className='mt-1 mb-1'>
            <Row>
              <Col as='h2' className='lead fw-bold'>
                {quickLinksTitle}
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col>
                {(quickLinks || []).map(({ href, label }) => (
                  <a
                    key={href}
                    href={`${SITE_URL}${href}`}
                    className='d-block mt-1 mb-1 ms-1 me-1 text-decoration-none text-secondary'
                  >
                    {label}
                  </a>
                ))}
              </Col>
            </Row>
          </Col>
          <Col lg={3} className='mt-1 mb-1'>
            <Row>
              <Col as='h2' className='lead fw-bold'>
                {poweredTitle}
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col className='d-flex flex-wrap align-items-center'>---</Col>
            </Row>
          </Col>
        </Row>
        <Row className='border border-start-0 border-end-0 border-bottom-0 pt-3'>
          <Col md='3' className='mt-1 mb-1'>
            <div className='d-flex flex-wrap align-items-center'>
              <span className='mr-1 small fw-bold'>{languageTitle}:</span>
              <LangSelect />
            </div>
          </Col>
          <Col md='9' className='mt-1 mb-1'>
            <p className='small text-secondary text-end'>{credits}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
