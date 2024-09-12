import { WebSocketServer, WebSocket } from 'ws'
import { onConnection } from './messages'

export const wss = new WebSocketServer({
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

wss.on('connection', onConnection)

// function randomPlayerAndWord() {
//   const playerListArray = Array.from(playerList).filter(
//     ([, { isAdmin }]) => !isAdmin,
//   )
//   let randomPlayer = Math.floor(Math.random() * playerListArray.length)
//   const words = playerListArray.flatMap(([, { playerWords }]) => playerWords)
//   let randomWord = Math.floor(Math.random() * words.length)

//   return [playerListArray[randomPlayer][0], words[randomWord]]
// }

// function sendPlayerListAdmin() {
//   const action: ServerActionAdminUpdatePlayerList = {
//     action: ServerAction.ADMIN_UPDATE_PLAYER_LIST,
//     payload: Array.from(playerList)
//       .filter(([, { isAdmin }]) => !isAdmin)
//       .map(([playerId, { username, playerWords, ready }]) => ({
//         playerId,
//         username,
//         playerWords,
//         ready,
//       })),
//   }
//   admin?.send(JSON.stringify(action))
// }
