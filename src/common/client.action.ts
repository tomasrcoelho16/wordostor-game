export enum ClientAction {
  USERNAME_UPDATE = 'USERNAME_UPDATE',
  REGISTER_ADMIN = 'REGISTER_ADMIN',
}

export type ClientActionUsernameUpdate = {
  action: ClientAction.USERNAME_UPDATE
  payload: string
}

export type ClientActionRegisterAdmin = {
  action: ClientAction.REGISTER_ADMIN
}
