// import "./MoveNameContainer.css";
import { PlayerOption } from "@/lib/enums";
import { Button, ButtonGroup } from "@heroui/button"; 

interface MoveNameProps {
  input1: string | undefined;
  input2: string | undefined;
  onUserGuess: (userGuess: PlayerOption) => void;
}

function MoveNameContainer({ input1, input2, onUserGuess }: MoveNameProps) {
  function handleClickP1() {
    if (!(input1 && input2)) return;
    onUserGuess(PlayerOption.player1);
  }

  function handleClickP2() {
    if (!(input1 && input2)) return;
    onUserGuess(PlayerOption.player2);
  }

  return (
    <div className="h-max grid grid-cols-2 gap-16 mx-8 my-4">
      <Button
        className="text-8xl/normal bg-primary hover:bg-primary-400 text-black h-max font-sans font-light"
        variant="solid"
        fullWidth
        onPress={handleClickP1}
      >
        {input1 ? input1 : "Loading..."}
      </Button>
      <Button
        className="text-8xl/normal bg-primary hover:bg-primary-400 text-black h-max font-sans font-light"
        variant="solid"
        fullWidth
        onPress={handleClickP2}
      >
        {input2 ? input2 : "Loading..."}
      </Button>
    </div>
  );
}

export default MoveNameContainer;
