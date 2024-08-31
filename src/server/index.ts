import { WebSocketServer, WebSocket } from 'ws'
import { ServerAckAction, ServerAction } from '../common/constants'
import { v4 as uuidv4 } from 'uuid'
import { ClientAction } from '../common/client.action'

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

type PlayerInfo = {
  socket: WebSocket
  username: string
  playerWords: string[]
}

// const adminList: WebSocket
const playerList: Map<string, PlayerInfo> = new Map()

wss.on('connection', (socket) => {
  const playerId = uuidv4()

  const data: ServerAckAction = {
    action: ServerAction.SERVER_ACK_CONNECTION,
    payload: {
      serverId,
      playerId,
    },
  }

  socket.send(JSON.stringify(data))

  socket.on('message', (receivedData) => {
    console.log(`just received ${receivedData}`)

    const data = JSON.parse(receivedData.toString())

    if (data && data.hasOwnProperty('action')) {
      const playerId = data.payload.playerId
      switch (data.action) {
        case ClientAction.CLIENT_ACK_CONNECTION:
          if (!playerList.has(playerId)) {
            playerList.set(playerId, {
              socket,
              username: '',
              playerWords: [],
            })
          }
          break
        case ClientAction.USERNAME_UPDATE:
          const playerInfo = playerList.get(playerId)
          if (playerList.has(playerId) && playerInfo) {
            playerList.set(playerId, {
              ...playerInfo,
              username: data.payload.username,
            })
          }
          break
        default:
          break
      }
    }
  })
})

setInterval(() => {
  console.log(playerList.keys())
}, 2000)
