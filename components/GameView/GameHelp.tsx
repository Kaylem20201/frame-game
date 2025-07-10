import { useDisclosure } from "@heroui/modal";
import HelpIcon from "@/assets/HelpIcon";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";

function GameHelp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="gameHelp">
      <button className="hover:invert" onClick={onOpen}>
        <HelpIcon />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-secondary">Help</ModalHeader>
              <ModalBody className="text-secondary">
                <ul>
                  <li>Assume both buttons were pressed on the same frame.</li>
                  <li>Assume both attacks will hit the opponent.</li>
                  <li>
                    Assume that the attack will hit on the first possible active
                    frame.
                  </li>
                </ul>
                <p>
                  <strong>Which character lands their attack?</strong>
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GameHelp;
