import { ServerActionsData } from '../../../common/server.action'

export function handlerMessages(this: WebSocket, ev: MessageEvent<string>) {
  const data: ServerActionsData = JSON.parse(ev.data)
}
