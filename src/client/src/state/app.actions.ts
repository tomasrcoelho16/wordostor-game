import { Player } from './app.types'

export const actionUpdatePlayerList = (playerList: Player[]) => ({
  type: 'UPDATE_PLAYERLIST' as const,
  payload: playerList,
})

export const actionUnknown = (...args: unknown[]) => ({
  type: 'UNKNOWN_ACTION' as const,
  payload: args,
})
