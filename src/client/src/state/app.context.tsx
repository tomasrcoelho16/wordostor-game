import React, { PropsWithChildren, useReducer } from 'react'
import { AppContextState } from './app.types'
import { reducer } from './app.reducer'

export const AppContext = React.createContext<AppContextState>({
  playerList: new Map(),
  dispatchState: () => void 0,
})

export function AppContextProvider(props: PropsWithChildren) {
  const [state, dispatchState] = useReducer(reducer, { playerList: new Map() })
  const { children } = props

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatchState,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
