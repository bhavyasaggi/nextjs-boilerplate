import { createContext, useReducer } from 'react'

export const HeaderValueContext = createContext()
export const HeaderReducerContext = createContext()

function headerReducer(prevHeaderState, newHeaderState) {
  const updatedHeaderState =
    typeof newHeaderState !== 'undefined' ? newHeaderState : !prevHeaderState
  document
    .querySelector('body')
    .classList[updatedHeaderState ? 'add' : 'remove'](
      'w-100',
      'h-100',
      'overflow-hidden'
    )
  return updatedHeaderState
}

export default function HeaderProvider({ children }) {
  const [headerState, reduceHeaderState] = useReducer(headerReducer, false)
  return (
    <HeaderReducerContext.Provider value={reduceHeaderState}>
      <HeaderValueContext.Provider value={headerState}>
        {children}
      </HeaderValueContext.Provider>
    </HeaderReducerContext.Provider>
  )
}
