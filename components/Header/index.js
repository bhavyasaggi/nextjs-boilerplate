import HeaderProvider from './Provider'
import HeaderBar from './Bar'
import HeaderAside from './Aside'
import HeaderLinks from './Links'

export default function Header() {
  return (
    <HeaderProvider>
      <HeaderBar />
      <HeaderAside>
        <HeaderLinks />
      </HeaderAside>
    </HeaderProvider>
  )
}
