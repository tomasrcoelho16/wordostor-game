import { WebSocketServer, WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { ClientAction } from '../common/client.action'
import {
  PlayerInfo,
  ServerAction,
  ServerActionAdminUpdatePlayerList,
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

  socket.on('message', (receivedData) => {
    const data = JSON.parse(receivedData.toString())

    if (data && data.hasOwnProperty('action')) {
      switch (data.action) {
        case ClientAction.REGISTER_ADMIN:
          admin = socket
          break
        case ClientAction.USERNAME_UPDATE:
          playerList.set(playerId, {
            ...playerList.get(playerId)!,
            username: data.payload,
          })
          console.log(`Updated ${playerId} username to "${data.payload}"`)
          sendPlayerListAdmin()
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

function sendPlayerListAdmin() {
  const action: ServerActionAdminUpdatePlayerList = {
    action: ServerAction.ADMIN_UPDATE_PLAYER_LIST,
    payload: Array.from(playerList).map(([playerId, { username }]) => ({
      playerId,
      username,
    })),
  }
  admin?.send(JSON.stringify(action))
}
