'use client'

import { Player } from "@/app/lib/interfaces";
import './MoveNameContainer.css'

function MoveNameContainer(props: {
  char1: Player,
  char2: Player,
  userGuess: number,
}) {

  const char1 = props.char1;
  const char2 = props.char2;

  function userClick1() {
    props.userGuess = 1;
  }

  function userClick2() {
    props.userGuess = 2;
  }

  return (
    <div className="moveNameContainer">
      <div className="moveName move1" onClick={userClick1}>
        {char1.moveData.input}
      </div>
      <div className="moveName move2" onClick={userClick2}>
        {char2.moveData.input}
      </div>
    </div>
  )
}

export default MoveNameContainer;
