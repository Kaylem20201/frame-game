import "./PlayerWindow.css";
import { Player } from "@/lib/interfaces";
import Image from "next/image";

function PlayerWindow(props: { player: Player | undefined; victor: boolean }) {
  const name = props.player?.charName?.replace(/ /g, "_");
  const move = props.player?.moveData?.input;
  const imagePaths = props.player?.moveData?.imagePaths;

  function MoveImage() {
    console.log(imagePaths);
    const imagePath = imagePaths ? imagePaths[0] : undefined;
    console.log(imagePath);
    const image = imagePath ? (
      <img src={imagePath} alt={name + " " + move} />
    ) : null;

    return (
      <div
        className="moveImage"
        style={{ backgroundColor: props.victor ? "green" : "inherit" }}
      >
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
