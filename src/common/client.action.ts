export enum ClientAction {
  USERNAME_UPDATE = 'USERNAME_UPDATE',
  REGISTER_ADMIN = 'REGISTER_ADMIN',
  WORDS_UPDATE = 'WORDS_UPDATE',
  START_GAME = 'START_GAME',
}

export type ClientActionUsernameUpdate = {
  action: ClientAction.USERNAME_UPDATE
  payload: string
}

export type ClientActionUpdateWords = {
  action: ClientAction.WORDS_UPDATE
  payload: string[]
}

export type ClientActionRegisterAdmin = {
  action: ClientAction.REGISTER_ADMIN
}

export type ClientActionStartGame = {
  action: ClientAction.START_GAME
}
