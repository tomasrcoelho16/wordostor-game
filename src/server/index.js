import { WebSocketServer } from 'ws'

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

const socketTest = []
const playerList = new Map()

wss.on('connection', (socket) => {
  console.log('new connection')

  socketTest.push(socket)

  const data = {
    action: 'SETUP',
    payload: playerList.size,
  }

  socket.send(JSON.stringify(data))

  socket.on('message', (receivedData) => {
    console.log(`just received ${receivedData}`)

    const data = JSON.parse(receivedData)

    if (data && data.hasOwnProperty('action')) {
      switch (data.action) {
        case 'USERNAME_UPDATE':
          playerList.set(data.playerId, data.payload)
          console.log(playerList)
          break
        default:
          break
      }
    }
  })

  setInterval(() => {
    socketTest.forEach((sc, index) => {
      const data = {
        action: 'ASDFASDF',
        payload: index,
      }
      sc.send(JSON.stringify(data))
    })
  }, 5000)
})
