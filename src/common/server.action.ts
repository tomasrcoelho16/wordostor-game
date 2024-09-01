import type { WebSocket } from 'ws'

export enum ServerAction {
  ADMIN_UPDATE_PLAYER_LIST = 'ADMIN_UPDATE_PLAYER_LIST',
  GAME_START = 'GAME_START',
  GAME_END = 'GAME_END',
}

export type PlayerInfo = {
  username: string
  playerWords: string[]
  ready: boolean
  isAdmin: boolean
  socket: WebSocket
}

export type ServerActionAdminUpdatePlayerList = {
  action: ServerAction.ADMIN_UPDATE_PLAYER_LIST
  payload: Array<
    {
      playerId: string
    } & Omit<PlayerInfo, 'socket' | 'isAdmin'>
  >
}

export type ServerActionStartGame = {
  action: ServerAction.GAME_START
  payload: {
    word: string
    isImpostor: boolean
  }
}

export type ServerActionEndGame = {
  action: ServerAction.GAME_END
}
