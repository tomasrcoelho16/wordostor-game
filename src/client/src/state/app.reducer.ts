import { produce } from 'immer'
import { AppContextState, ReducerAppActions } from './app.types'
import { Reducer } from 'react'

export const reducer: Reducer<
  Omit<AppContextState, 'dispatchState'>,
  ReducerAppActions
> = produce((draft, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYERLIST':
      for (const player of action.payload) {
        draft.playerList.set(player.id, player)
      }
      break
    case 'UNKNOWN_ACTION':
      console.log('Got unknown action with params: ', action.payload)
      break
  }
})
