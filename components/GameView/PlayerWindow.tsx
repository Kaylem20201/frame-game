import "./PlayerWindow.css";
import { Player } from "@/lib/interfaces";
import Image from "next/image";

enum BGStyles {
  Default = "bg-inherit",
  Winner = "bg-success-700",
  Loser = "bg-danger-900",
}

function PlayerWindow(props: {
  player: Player | undefined;
  victor: boolean;
  isGameOver: boolean;
}) {
  const name = props.player?.charName?.replace(/ /g, "_");
  const move = props.player?.moveData?.input;
  const imagePaths = props.player?.moveData?.imagePaths;

  function MoveImage() {
    const imagePath = imagePaths ? imagePaths[0] : undefined;
    const image = imagePath ? (
      <img src={imagePath} alt={name + " " + move} />
    ) : null;

    let bgStyle = () => {
      if (!props.isGameOver) return BGStyles.Default;
      return props.victor ? BGStyles.Winner : BGStyles.Loser
    };

    return (
      <div className={bgStyle()}>
        {image}
      </div>
    );
  }

  return (
    <div className="characterWindow">
      <MoveImage />
    </div>
  );
}

export default PlayerWindow;
