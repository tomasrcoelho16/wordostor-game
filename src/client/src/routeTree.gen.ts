/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const LobbyLazyImport = createFileRoute('/lobby')()
const GameLazyImport = createFileRoute('/game')()
const AppLazyImport = createFileRoute('/App')()

// Create/Update Routes

const LobbyLazyRoute = LobbyLazyImport.update({
  path: '/lobby',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/lobby.lazy').then((d) => d.Route))

const GameLazyRoute = GameLazyImport.update({
  path: '/game',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/game.lazy').then((d) => d.Route))

const AppLazyRoute = AppLazyImport.update({
  path: '/App',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/App.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/App': {
      id: '/App'
      path: '/App'
      fullPath: '/App'
      preLoaderRoute: typeof AppLazyImport
      parentRoute: typeof rootRoute
    }
    '/game': {
      id: '/game'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof GameLazyImport
      parentRoute: typeof rootRoute
    }
    '/lobby': {
      id: '/lobby'
      path: '/lobby'
      fullPath: '/lobby'
      preLoaderRoute: typeof LobbyLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AppLazyRoute,
  GameLazyRoute,
  LobbyLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/App",
        "/game",
        "/lobby"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/App": {
      "filePath": "App.lazy.tsx"
    },
    "/game": {
      "filePath": "game.lazy.tsx"
    },
    "/lobby": {
      "filePath": "lobby.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
