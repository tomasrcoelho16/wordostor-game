export enum ServerAction {
  ADMIN_UPDATE_PLAYER_LIST = 'ADMIN_UPDATE_PLAYER_LIST',
}

export type PlayerInfo = {
  username: string
  playerWords: string[]
}

export type ServerActionAdminUpdatePlayerList = {
  action: ServerAction.ADMIN_UPDATE_PLAYER_LIST
  payload: Array<{
    playerId: string
    username: string
  }>
}
