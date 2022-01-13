import AlertProvider, { useAlerts, useAlertDispatch } from './Provider'

import AlertContainer from './Container'

export { useAlerts, useAlertDispatch }

export default function AlertContextProvider({
  autoDismiss,
  autoDismissTimeout,
  children,
}) {
  return (
    <AlertProvider>
      {children}
      <AlertContainer
        autoDismiss={autoDismiss}
        autoDismissTimeout={autoDismissTimeout}
      />
    </AlertProvider>
  )
}
