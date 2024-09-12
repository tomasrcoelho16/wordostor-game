export type ClientActionsData =
  | ClientActionUsernameUpdate
  | ClientActionUpdateWords

export enum ClientAction {
  CLIENT_USERNAME_UPDATE = 'CLIENT_USERNAME_UPDATE',
  CLIENT_WORDS_UPDATE = 'CLIENT_WORDS_UPDATE',
  REGISTER_ADMIN = 'REGISTER_ADMIN',
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
}

export type ClientActionUsernameUpdate = {
  type: ClientAction.CLIENT_USERNAME_UPDATE
  payload: string
}

export type ClientActionUpdateWords = {
  type: ClientAction.CLIENT_WORDS_UPDATE
  payload: string[]
}

export type ClientActionRegisterAdmin = {
  type: ClientAction.REGISTER_ADMIN
}

export type ClientActionStartGame = {
  type: ClientAction.START_GAME
}

export type ClientActionEndGame = {
  type: ClientAction.END_GAME
}
