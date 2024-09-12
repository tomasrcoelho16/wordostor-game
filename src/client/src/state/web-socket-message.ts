import { Dispatch } from 'react'
import { ServerActionsData } from '../../../common/server.action'
import { ReducerAppActions } from './app.types'

export function handlerMessages(
  this: WebSocket,
  dispatch: Dispatch<ReducerAppActions>,
  ev: MessageEvent<string>,
) {
  const data: ServerActionsData = JSON.parse(ev.data)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(data as any)
}
