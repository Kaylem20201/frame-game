import { Matchup } from "@/lib/interfaces";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

interface GameEndProps {
  isOpen: boolean;
  isWinner: boolean;
  matchup: Matchup
  onReset: () => Promise<void>;
}

function GameEndContainer(props: GameEndProps) {
  const { isOpen, isWinner, onReset } = props;


  let bgColor = isWinner ? "bg-success" : "bg-danger";

  return (
    <Modal isOpen={isOpen} isDismissable={false} backdrop="transparent">
      <ModalContent >
        <ModalHeader className={"flex flex-col rounded-sm text-black " + bgColor}>
          {isWinner ? "You win!" : "You lose!"}
        </ModalHeader>
        <ModalContent>
          <div className="grid grid-cols-2 grid-rows-2">
            <div>P1 Move: {props.matchup.player1.moveData.input}</div>
            <div>P2 Move: {props.matchup.player2.moveData.input}</div>
            <div>P1 Startup: {props.matchup.player1.moveData.startup}</div>
            <div>P1 Startup: {props.matchup.player2.moveData.startup}</div>
            {/*TODO: Provide links back to wiki with original information*/}
          </div>
        </ModalContent>
        <ModalFooter>
          <>
            <Button
              className="bg-secondary text-small w-auto h-auto self-center"
              onPress={onReset}
            >
              Reset?
            </Button>
          </>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default GameEndContainer;
