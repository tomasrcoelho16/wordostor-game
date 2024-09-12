import type { WebSocket } from 'ws'

export type ServerActionsData =
  | ServerActionAdminUpdatePlayerList
  | ServerActionStartGame
  | ServerActionEndGame

export enum ServerAction {
  ADMIN_UPDATE_PLAYER_LIST = 'ADMIN_UPDATE_PLAYER_LIST',
  GAME_START = 'GAME_START',
  GAME_END = 'GAME_END',
}

export type Player = PlayerInfo & PlayerExtra

export type PlayerExtra = {
  ready: boolean
  isAdmin: boolean
  socket: WebSocket
}

export type PlayerInfo = {
  id: string
  name: string
  points: number
  color: string
  playerWords: string[]
}

export type ServerActionAdminUpdatePlayerList = {
  type: ServerAction.ADMIN_UPDATE_PLAYER_LIST
  payload: Array<PlayerInfo>
}

export type ServerActionStartGame = {
  type: ServerAction.GAME_START
  payload: {
    word: string
    isImpostor: boolean
  }
}

export type ServerActionEndGame = {
  type: ServerAction.GAME_END
}
