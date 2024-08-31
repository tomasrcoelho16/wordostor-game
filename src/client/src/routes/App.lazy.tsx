import { useState } from 'react'
import logo from '../assets/logo.png'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/App')({
  component: App,
})

let inGame: boolean

const socket = new WebSocket('ws://localhost:3070')

// Listen for messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  if (data) {
    switch (data.action) {
      case 'SETUP':
        playerId = data.payload
        break
      default:
        console.log(data)
    }
  }
  console.log('Message from server ', event.data)
})

function handleStartGame() {
  console.log(`Starting Game :)`)
  const data = {
    action: 'GAME_START',
  }
  socket.send(JSON.stringify(data))
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-evenly ">
          <div className="card">
            <h1 className="font-bold text-xl"> Number of Players</h1>
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>
          <div className="card">
            <h1 className="font-bold text-xl"> Players </h1>
          </div>
          <div className="card">
            <h1 className="font-bold text-xl"> Number of Words</h1>
          </div>
        </div>
        <button
          className="mt-16 p-5 mx-auto text-black font-bold hover:text-xl"
          onClick={handleStartGame.bind(null)}
        >
          START GAME
        </button>
      </div>
    </>
  )
}
