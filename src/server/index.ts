import { WebSocketServer, WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { ClientAction } from '../common/client.action'
import {
  PlayerInfo,
  ServerAction,
  ServerActionAdminUpdatePlayerList,
  ServerActionEndGame,
  ServerActionStartGame,
} from '../common/server.action'

const serverId = uuidv4()

const wss = new WebSocketServer({
  port: 3070,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
})

// const adminList: WebSocket
let admin: WebSocket | undefined
const playerList: Map<string, PlayerInfo> = new Map()

wss.on('connection', (socket) => {
  const playerId = uuidv4()

  playerList.set(playerId, {
    username: '',
    playerWords: [],
    ready: false,
    isAdmin: false,
    socket,
  })

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
              ([playerId, { isAdmin }]) => !isAdmin || playerId != impostor,
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
})

function randomPlayerAndWord() {
  const playerListArray = Array.from(playerList).filter(
    ([, { isAdmin }]) => !isAdmin,
  )
  let randomPlayer = Math.floor(Math.random() * playerListArray.length)
  const words = playerListArray.flatMap(([, { playerWords }]) => playerWords)
  let randomWord = Math.floor(Math.random() * words.length)

  return [playerListArray[randomPlayer][0], words[randomWord]]
}

function sendPlayerListAdmin() {
  const action: ServerActionAdminUpdatePlayerList = {
    action: ServerAction.ADMIN_UPDATE_PLAYER_LIST,
    payload: Array.from(playerList)
      .filter(([, { isAdmin }]) => !isAdmin)
      .map(([playerId, { username, playerWords, ready }]) => ({
        playerId,
        username,
        playerWords,
        ready,
      })),
  }
  admin?.send(JSON.stringify(action))
}
