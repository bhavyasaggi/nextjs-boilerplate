import { createContext, useContext, useReducer } from 'react'

import alertReducer from './reducer'

const AlertValueContext = createContext()
const AlertActionContext = createContext()

export function useAlerts() {
  const alerts = useContext(AlertValueContext)
  return alerts
}

export function useAlertDispatch() {
  const alertDispatch = useContext(AlertActionContext)
  return alertDispatch
}

export default function AlertProvider({ children }) {
  const [alerts, dispatchAlert] = useReducer(alertReducer, [])

  return (
    <AlertActionContext.Provider value={dispatchAlert}>
      <AlertValueContext.Provider value={alerts}>
        {children}
      </AlertValueContext.Provider>
    </AlertActionContext.Provider>
  )
}
