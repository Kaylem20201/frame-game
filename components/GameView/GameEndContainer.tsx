import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

interface GameEndProps {
  isOpen: boolean;
  isWinner: boolean;
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
