import './MoveNameContainer.css'
import { PlayerOption } from "../lib/enums";

interface MoveNameProps {
  input1: string | undefined,
  input2: string | undefined,
  onUserGuess: (userGuess: PlayerOption) => void
}

function MoveNameContainer({
  input1,
  input2,
  onUserGuess
}: MoveNameProps) {

  function handleClickP1() {
    if (!(input1 && input2)) return;
    onUserGuess(PlayerOption.player1);
  }

  function handleClickP2() {
    if (!(input1 && input2)) return;
    onUserGuess(PlayerOption.player2);
  }

  return (
    <div className="moveNameContainer">
      <div className="moveName move1" onClick={handleClickP1}>
        {input1 ? input1 : 'Loading...'}
      </div>
      <div className="moveName move2" onClick={handleClickP2}>
        {input2 ? input2 : 'Loading...'}
      </div>
    </div>
  )
}

export default MoveNameContainer;
