import { Dispatch } from 'react'
import { ClientActionsData } from '../../../common/client.action'
import { PlayerInfo, ServerActionsData } from '../../../common/server.action'

export type ReducerAppActions = ClientActionsData | ServerActionsData

export type AppContextState = {
  playerList: Map<string, PlayerInfo>
  socket: WebSocket
  dispatchState: Dispatch<ReducerAppActions>
}
