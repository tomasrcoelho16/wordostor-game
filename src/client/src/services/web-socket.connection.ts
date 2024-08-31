import {
  ClientAction,
  ClientActionRegisterAdmin,
  ClientActionUsernameUpdate,
} from '../../../common/client.action'
import { ServerAction } from '../../../common/server.action'

const socket = new WebSocket('ws://localhost:3070')

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  if (data) {
    switch (data.action) {
      case ServerAction.ADMIN_UPDATE_PLAYER_LIST:
        document.dispatchEvent(
          new CustomEvent('UPDATE_PLAYER_LIST', {
            detail: {
              playerList: data.payload,
            },
          }),
        )
        break
      default:
        console.log(data)
    }
  }
  console.log('Message from server ', event.data)
})

export function registerAdmin() {
  const action: ClientActionRegisterAdmin = {
    action: ClientAction.REGISTER_ADMIN,
  }

  socket.send(JSON.stringify(action))
}

export function handleStartGame() {
  console.log(`Starting Game :)`)
  const data = {
    action: 'GAME_START',
  }
  socket.send(JSON.stringify(data))
}

export function handleUsernameUpdate(username: string) {
  const action: ClientActionUsernameUpdate = {
    action: ClientAction.USERNAME_UPDATE,
    payload: username,
  }

  socket.send(JSON.stringify(action))
}
