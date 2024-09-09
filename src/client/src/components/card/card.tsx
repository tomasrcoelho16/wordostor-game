import { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren

export function Card(props: CardProps) {
  const { children } = props

  return <div className="p-3 bg-white rounded-md">{children}</div>
}
