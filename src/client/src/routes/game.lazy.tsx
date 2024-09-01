import logo from '../assets/logo.png'
import { createLazyFileRoute } from '@tanstack/react-router'
import { isImpostor, word } from '../services/web-socket.connection'

export const Route = createLazyFileRoute('/game')({
  component: Card,
})

function Card() {
  return (
    <>
      <div className="flip-box">
        <h1 className="text-black font-bold text-2xl text-center mb-5">
          {' '}
          Check your word{' '}
        </h1>
        <div className="flip-box-inner justify-items-center">
          <div className="flip-box-front rounded-2xl border-2 border-gray-700 flex flex-row justify-center items-center">
            <img src={logo} alt="LOGO"></img>
          </div>
          <div className="flip-box-back rounded-2xl flex flex-row justify-center items-center">
            <p className="text-black font-bold text-lg">
              {isImpostor ? 'Impostor' : word}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
