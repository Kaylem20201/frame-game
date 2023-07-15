import './PlayerWindow.css';
import { Player } from "./interfaces";

function PlayerWindow (props : {player: Player, victor: boolean}) {
  const name : string = props.player.charName;
  const move : string = props.player.move;

  function MoveImage() {
    const imageLoc = '/src/assets/' + name + '/' + move + '.png';
    const image = <img src={imageLoc} alt={move} />;

    return (
      <div className="MoveImage" style={{backgroundColor: props.victor ? 'green' : 'inherit'}}>
        {image}
      </div>
    )
  }

  return (
    <div className="CharacterWindow">
      <MoveImage />
    </div>
  );
}

export default PlayerWindow;