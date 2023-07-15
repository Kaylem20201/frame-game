import { Player } from "./interfaces";
import './MoveNameContainer.css'

function MoveNameContainer(props: {
  char1 : Player, 
  char2 : Player,
  userGuess : number,
  setUserGuess : (userGuess : number) => void
}) {

  const char1 = props.char1;
  const char2 = props.char2;

  function userClick1() {
    props.setUserGuess(1);
  }

  function userClick2() {
    props.setUserGuess(2);
  }

  return (
    <div className="moveNameContainer">
      <div className="moveName move1" onClick={userClick1}>
        {char1.move}
      </div>
      <div className="moveName move2" onClick={userClick2}>
        {char2.move}
      </div>
    </div>
  )
}

export default MoveNameContainer;