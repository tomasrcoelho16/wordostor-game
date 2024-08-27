import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import '../index.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 bg-black">
        <Link to="/lobby" className="text-black">
          Lobby
        </Link>{' '}
        <Link to="/game" className="text-black">
          Game
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
