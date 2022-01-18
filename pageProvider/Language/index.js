import { useContext, createContext } from 'react'

const LanguageContext = createContext()

export default function LanguageProvider({ value, children }) {
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const languageStore = useContext(LanguageContext)
  return languageStore || {}
}
