import logo from '../assets/logo.png'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { isImpostor, word } from '../services/web-socket.connection'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/game')({
  component: Card,
})

function Card() {
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => {
      navigate({
        to: '/lobby',
      })
    }

    document.addEventListener('END_GAME', handler)

    return () => {
      document.removeEventListener('END_GAME', handler)
    }
  }, [navigate])

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
