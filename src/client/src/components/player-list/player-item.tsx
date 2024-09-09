import { SVGUser } from '../icons/user'

type PlayerItemProps = {
  name: string
  points?: number
}

export function PlayerItem(props: PlayerItemProps) {
  const { name, points } = props

  return (
    <li className="flex flex-row gap-4 content-center">
      <SVGUser classname="h-7 w-7" />
      <span className="text-[1rem] flex-1">{name}</span>
      <span className="text-[1rem]">{`${points || 0} pts`}</span>
    </li>
  )
}
