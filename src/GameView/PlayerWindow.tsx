import './PlayerWindow.css';
import { Player } from "./interfaces";

function PlayerWindow (props : {player: Player, victor: boolean}) {
  const name : string = props.player.charName.replace(/ /g, '_');
  const move : string = props.player.move.input;

  function MoveImage() {
    const imgName = props.player.move.imgName != null ? props.player.move.imgName : move
    const imageLoc = name + '/' + imgName + '.png';
    const image = <img src={imageLoc} alt={move} />;

    return (
      <div className="moveImage" style={{backgroundColor: props.victor ? 'green' : 'inherit'}}>
        {image}
      </div>
    )
  }

  return (
    <div className="characterWindow">
      <MoveImage />
    </div>
  );
}

export default PlayerWindow;