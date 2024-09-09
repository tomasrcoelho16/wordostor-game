import { Card } from '../card/card'
import { PlayerItem } from './player-item'

export function PlayerList() {
  return (
    <Card>
      <h3>Number of players</h3>
      <ul className="mt-4 flex flex-col gap-2">
        {[{ name: 'Miguel' }, { name: 'Ines', points: 10 }].map(
          ({ name, points }) => (
            <PlayerItem key={name} name={name} points={points} />
          ),
        )}
      </ul>
    </Card>
  )
}
