export enum ClientAction {
  CLIENT_ACK_CONNECTION = 'CLIENT_ACK_CONNECTION',
  USERNAME_UPDATE = 'USERNAME_UPDATE',
}

export type ClientActionUsernameUpdate = {
  action: ClientAction.USERNAME_UPDATE
  payload: {
    playerId: string
    username: string
  }
}

export type ClientActionAckConnection = {
  action: ClientAction.CLIENT_ACK_CONNECTION
  payload: {
    playerId: string
  }
}
