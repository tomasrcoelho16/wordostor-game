import { Dispatch } from 'react'
import { actionUnknown, actionUpdatePlayerList } from './app.actions'

export type ReducerAppActions =
  | ReturnType<typeof actionUpdatePlayerList>
  | ReturnType<typeof actionUnknown>

export type AppContextState = {
  playerList: Map<string, Player>
  dispatchState: Dispatch<ReducerAppActions>
}

export type Player = {
  id: string
  name: string
  points: number
  color: string
}
