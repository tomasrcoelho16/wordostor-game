export enum ServerAction {
  SERVER_ACK_CONNECTION = 'SERVER_ACK_CONNECTION',
}

export enum ClientAction {
  CLIENT_CONNECTED = 'CLIENT_CONNECTED',
}

export type ServerAckAction = {
  action: ServerAction.SERVER_ACK_CONNECTION
  payload: {
    playerId: string
    serverId: string
  }
}
