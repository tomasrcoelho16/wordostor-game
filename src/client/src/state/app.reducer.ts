import { produce } from 'immer'
import { AppContextState, ReducerAppActions } from './app.types'
import { Reducer } from 'react'
import { ClientAction } from '../../../common/client.action'
import { ServerAction } from '../../../common/server.action'

export const reducer: Reducer<
  Omit<AppContextState, 'dispatchState'>,
  ReducerAppActions
> = produce((draft, action) => {
  switch (action.type) {
    case ClientAction.CLIENT_WORDS_UPDATE:
    case ClientAction.CLIENT_USERNAME_UPDATE:
      draft.socket.send(JSON.stringify(action))
      break

    case ServerAction.ADMIN_UPDATE_PLAYER_LIST:
      for (const player of action.payload) {
        draft.playerList.set(player.id, player)
      }
      break

    default:
      console.log('Got unknown action with params: ', action)
      break
  }
})
