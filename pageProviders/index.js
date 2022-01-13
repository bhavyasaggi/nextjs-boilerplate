import { useReducer, useContext, createContext } from 'react'

const StateContext = createContext()
const UpdateContext = createContext()

export default function ContextStore({ value, children }) {
  const [state, updateState] = useReducer(
    (prevState, deltaState) => ({ ...prevState, ...deltaState }),
    value
  )
  return (
    <UpdateContext.Provider value={updateState}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </UpdateContext.Provider>
  )
}

export function useContextValue() {
  const contextState = useContext(StateContext)
  return contextState
}

export function useContextUpdate() {
  const contextUpdate = useContext(UpdateContext)
  return contextUpdate
}