import { Matchup } from "@/lib/interfaces";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

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
    <Modal isOpen={isOpen} isDismissable={false} hideCloseButton backdrop="transparent">
      <ModalContent >
        <ModalHeader className={"flex flex-col rounded-sm text-black " + bgColor}>
          {isWinner ? "You win!" : "You lose!"}
        </ModalHeader>
        <ModalBody className="text-white">
          <div className="flex flex-col text-center flex-nowrap gap-2">
            <div className="flex flex-row justify-evenly items-center font-bold text-large">
              {/*TODO: Provide links back to wiki with original information*/}
              <div className="flex-1">{props.matchup.player1.charName}</div>
              <div className="flex-1 shrink"></div>
              <div className="flex-1">{props.matchup.player2.charName}</div>
            </div>
            <div className="flex flex-row justify-evenly items-center">
              <div className="flex-1">{props.matchup.player1.moveData.input}</div>
              <div className="flex-1">Move</div>
              <div className="flex-1">{props.matchup.player2.moveData.input}</div>
            </div>
            <div className="flex flex-row justify-evenly items-center">
              <div className="flex-1">{props.matchup.player1.moveData.startup}</div>
              <div className="flex-1">Startup</div>
              <div className="flex-1">{props.matchup.player2.moveData.startup}</div>
            </div>
          </div>
        </ModalBody>
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
