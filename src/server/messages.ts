import { WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { Player } from '../common/server.action'

let admin: WebSocket | undefined
const playerList: Map<string, Player> = new Map()

export function onConnection(socket: WebSocket) {
  const playerId = uuidv4()

  playerList.set(playerId, {
    id: playerId,
    name: '',
    playerWords: [],
    color: '#000000',
    points: 0,
    ready: false,
    isAdmin: false,
    socket,
  })

  socket.send(JSON.stringify({ action: 'LOL' }))

  socket.on('message', (receivedData) => {
    const data = JSON.parse(receivedData.toString())

    if (data && data.hasOwnProperty('action')) {
      switch (data.action) {
        case ClientAction.REGISTER_ADMIN:
          admin = socket
          playerList.set(playerId, {
            ...playerList.get(playerId)!,
            isAdmin: true,
          })
          sendPlayerListAdmin()
          break
        case ClientAction.START_GAME:
          const [impostor, randomWord] = randomPlayerAndWord()
          console.log(`word: ${randomWord} for impostor: ${impostor}`)
          const actionWord: ServerActionStartGame = {
            action: ServerAction.GAME_START,
            payload: {
              isImpostor: false,
              word: randomWord,
            },
          }

          Array.from(playerList)
            .filter(
              ([playerId, { isAdmin }]) => !isAdmin && playerId !== impostor,
            )
            .forEach(([, { socket: playerSocket }]) =>
              playerSocket.send(JSON.stringify(actionWord)),
            )

          const actionImpostor: ServerActionStartGame = {
            action: ServerAction.GAME_START,
            payload: {
              word: '',
              isImpostor: true,
            },
          }

          playerList.get(impostor)!.socket.send(JSON.stringify(actionImpostor))
          break
        case ClientAction.USERNAME_UPDATE:
          playerList.set(playerId, {
            ...playerList.get(playerId)!,
            username: data.payload,
          })
          console.log(`Updated ${playerId} username to "${data.payload}"`)
          sendPlayerListAdmin()
          break
        case ClientAction.WORDS_UPDATE:
          playerList.set(playerId, {
            ...playerList.get(playerId)!,
            playerWords: data.payload,
          })
          sendPlayerListAdmin()
          break
        case ClientAction.END_GAME:
          const action: ServerActionEndGame = {
            action: ServerAction.GAME_END,
          }
          Array.from(playerList).forEach(([, { socket: playerSocket }]) =>
            playerSocket.send(JSON.stringify(action)),
          )
          break
        default:
          break
      }
    }
  })

  socket.on('close', () => {
    console.log(`Player ${playerId} left!`)
    playerList.delete(playerId)
    sendPlayerListAdmin()
  })
}
