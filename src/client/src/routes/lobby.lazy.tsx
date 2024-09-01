import { FormEvent, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import {
  actionWordsUpdate,
  handleUsernameUpdate,
<<<<<<< HEAD
  user,
=======
  preferedUsername,
  preferedWords,
>>>>>>> feat/refactor
} from '../services/web-socket.connection'

export const Route = createLazyFileRoute('/lobby')({
  component: Menu,
})

function Menu() {
<<<<<<< HEAD
  const [username, setUsername] = useState(user)
=======
  const [username, setUsername] = useState(preferedUsername || '')
>>>>>>> feat/refactor
  const navigate = useNavigate()

  function handleWordsUpdate(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    const wordsObj = Object.fromEntries(data)
    const words = Object.values(wordsObj) as string[]
    actionWordsUpdate(words.filter(Boolean))
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = () => {
      navigate({
        to: '/game',
      })
    }

    document.addEventListener('START_GAME', handler)

    return () => {
      document.removeEventListener('START_GAME', handler)
    }
  }, [navigate])

  return (
    <>
      <div className="m-auto size-96 flex justify-center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex flex-col justify-center m-auto w-56 mb-5">
        <label className="text-black font-bold">Username</label>
        <input
          className="input"
          placeholder="username..."
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <button
          className="mt-12S text-xl text-black p-2 self-center hover:font-bold"
          onClick={handleUsernameUpdate.bind(null, username)}
        >
          Update
        </button>
      </div>
      <form
        className="flex flex-col justify-center m-auto w-56 space-y-1"
        onSubmit={handleWordsUpdate}
      >
        <label className="text-black font-bold">Pick 3 to 5 words</label>
        {(preferedWords.length > 0
          ? preferedWords
          : ['Pudim', 'Abacate', 'Macaca', 'Calistenia', 'Futsal']
        ).map((exampleWord, index) => (
          <input
            key={exampleWord}
            name={`word_${index}`}
            placeholder={exampleWord}
            defaultValue={preferedWords.length > 0 ? exampleWord : undefined}
            className="input"
          />
        ))}
        <button className="mt-12S text-xl text-black p-2 self-center hover:font-bold">
          Update
        </button>
      </form>
    </>
  )
}
