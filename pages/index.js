import Home from '../pageComponents/Home'

export default function PageHome() {
  return <Home />
}

// export const config = { amp: true }

export async function getStaticProps({ locale }) {
  const { default: getTranslations } = await import('../utils/getTranslations')
  const localeStrings = await getTranslations(['common'], locale)
  return {
    props: {
      localeStrings,
    },
  }
}
