export enum ServerAction {
  SERVER_ACK_CONNECTION = 'SERVER_ACK_CONNECTION',
}

export type ServerActionServerAck = {
  action: ServerAction.SERVER_ACK_CONNECTION
  payload: {
    playerId: string
    serverId: string
  }
}
