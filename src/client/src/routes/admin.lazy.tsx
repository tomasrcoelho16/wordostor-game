import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { createLazyFileRoute } from '@tanstack/react-router'
import {
  actionEndGame,
  actionStartGame,
  registerAdmin,
} from '../services/web-socket.connection'
import { ServerActionAdminUpdatePlayerList } from '../../../common/server.action'

export const Route = createLazyFileRoute('/admin')({
  component: App,
})

function App() {
  const [playerList, setPlayerList] = useState<
    ServerActionAdminUpdatePlayerList['payload']
  >([])
  const [inGame, setInGame] = useState(false)

  useEffect(() => {
    registerAdmin()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (event: any) => {
      console.log('asdfjasdkfhasdfhasd> >>>>>>>>>>>', event.detail)
      setPlayerList(event.detail.playerList)
    }

    document.addEventListener('UPDATE_PLAYER_LIST', handler)

    return () => {
      document.removeEventListener('UPDATE_PLAYER_LIST', handler)
    }
  }, [])

  return (
    <>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-evenly ">
          <div className="card">
            <h1 className="font-bold text-xl"> Number of Players</h1>
            <span>{playerList.length}</span>
          </div>
          <div className="card">
            <h1 className="font-bold text-xl"> Players </h1>
            <ul>
              {playerList.map(({ username }, index) => (
                <li key={index}>{username}</li>
              ))}
              {playerList.length === 0 && <span>No players yet!</span>}
            </ul>
          </div>
          <div className="card">
            <h1 className="font-bold text-xl">Number of Words</h1>
            <span>
              {
                playerList.flatMap(({ playerWords }) =>
                  playerWords.filter(Boolean),
                ).length
              }
            </span>
          </div>
        </div>
        {!inGame ? (
          <button
            className="mt-16 p-5 mx-auto text-black font-bold hover:text-xl"
            onClick={() => {
              setInGame(true)
              actionStartGame()
            }}
          >
            START GAME
          </button>
        ) : (
          <button
            className="mt-16 p-5 mx-auto text-red-800 font-bold hover:text-xl"
            onClick={() => {
              setInGame(false)
              actionEndGame()
            }}
          >
            END GAME
          </button>
        )}
      </div>
    </>
  )
}
