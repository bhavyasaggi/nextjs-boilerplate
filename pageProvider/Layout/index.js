import Container from 'react-bootstrap/Container'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/Breadcrumbs'
import GDPR from '../../components/GDPR'

export default function LayoutProvider({ children }) {
  return (
    <div className='bg-ternary'>
      <Header />
      <Container fluid>{children}</Container>
      <Breadcrumbs />
      <Footer />
      <GDPR />
    </div>
  )
}
