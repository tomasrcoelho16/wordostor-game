import { ServerAction } from '../../../common/constants'
import {
  ClientAction,
  ClientActionAckConnection,
  ClientActionUsernameUpdate,
} from '../../../common/client.action'

const LOCAL_STORAGE_KEY = 'WORDSTOR_GAME_INFO'

const socket = new WebSocket('ws://localhost:3070')

export let playerId: string = ''
export let serverId: string = ''

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  if (data) {
    switch (data.action) {
      case ServerAction.SERVER_ACK_CONNECTION: {
        const playerIdFromServer = data.payload.playerId
        const serverIdFromServer = data.payload.serverId
        const gameInfo = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || '{}',
        )

        if (gameInfo.serverId && gameInfo.serverId === serverIdFromServer) {
          playerId = gameInfo.playerId
          serverId = gameInfo.serverId
        } else {
          playerId = playerIdFromServer
          serverId = serverIdFromServer
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
              playerId: playerIdFromServer,
              serverId: serverIdFromServer,
            }),
          )
        }

        const action: ClientActionAckConnection = {
          action: ClientAction.CLIENT_ACK_CONNECTION,
          payload: {
            playerId,
          },
        }

        socket.send(JSON.stringify(action))
        break
      }
      default:
        console.log(data)
    }
  }
  console.log('Message from server ', event.data)
})

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
    payload: {
      playerId,
      username,
    },
  }

  socket.send(JSON.stringify(action))
}
