import { handlerMessages } from './web-socket-message'

const socket = new WebSocket('ws://localhost:3070')

socket.addEventListener('message', handlerMessages.bind(socket))
