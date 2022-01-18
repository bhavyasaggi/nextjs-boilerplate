import { createContext, useContext } from 'react'

import AlertProvider, { useAlerts, useAlertDispatch } from './Alert'
import ErrorProvider from './Error'
import LanguageProvider, { useLanguage } from './Language'
import LayoutProvider from './Layout'
import LoginProvider from './Login'
import SEOProvider from './SEO'
import TrackingProvider from './Tracking'
import ServiceWorkerProvider from './ServiceWorker'
import FaviconProvider from './Favicon'

const PageContext = createContext()

function usePageProps() {
  const pageProps = useContext(PageContext)
  return pageProps
}

export default function PageProvider({ pageProps, children }) {
  const { localeStrings, layout } = pageProps || {}
  return (
    <ErrorProvider>
      <LanguageProvider value={localeStrings}>
        <SEOProvider>
          <ServiceWorkerProvider>
            <TrackingProvider>
              <AlertProvider>
                <LoginProvider>
                  <FaviconProvider>
                    <LayoutProvider layout={layout}>
                      <PageContext.Provider value={pageProps}>
                        {children}
                      </PageContext.Provider>
                    </LayoutProvider>
                  </FaviconProvider>
                </LoginProvider>
              </AlertProvider>
            </TrackingProvider>
          </ServiceWorkerProvider>
        </SEOProvider>
      </LanguageProvider>
    </ErrorProvider>
  )
}

export { useAlerts, useAlertDispatch, useLanguage, usePageProps }
