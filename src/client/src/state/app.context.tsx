import React, { PropsWithChildren, useEffect, useReducer } from 'react'
import { AppContextState } from './app.types'
import { reducer } from './app.reducer'
import { handlerMessages } from './web-socket-message'

const socket = new WebSocket('ws://localhost:3070')

export const AppContext = React.createContext<AppContextState>({
  playerList: new Map(),
  dispatchState: () => void 0,
  socket: {} as WebSocket,
})

export function AppContextProvider(props: PropsWithChildren) {
  const [state, dispatchState] = useReducer(reducer, {
    playerList: new Map(),
    socket,
  })
  const { children } = props

  useEffect(() => {
    socket.addEventListener(
      'message',
      handlerMessages.bind(socket, dispatchState),
    )
    return () => {
      socket.removeEventListener(
        'message',
        handlerMessages.bind(socket, dispatchState),
      )
    }
  }, [dispatchState])

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
