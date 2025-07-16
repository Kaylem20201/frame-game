"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/react";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { GameAbbreviation } from "@/lib/enums";

interface DrawerProps {
  game: GameAbbreviation;
  resetGame: () => void;
}

export default function MenuDrawer({ game, resetGame }: DrawerProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="absolute md:size-14"
        size="sm"
        radius="full"
        color="primary"
        onPress={onOpen}
        variant="ghost"
        isIconOnly
      >
        <style>{`
          .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 14
          }`}
        </style>
        <span className="material-symbols-outlined">settings</span>
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="left"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Game Settings</DrawerHeader>
              <DrawerBody>
                <Select
                  label="Select a game:"
                  defaultSelectedKeys={game || GameAbbreviation.Strive}
                >
                  {Object.entries(GameAbbreviation).map(([key, value]) => (
                    <SelectItem key={key}>{value}</SelectItem>
                  ))}
                </Select>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="faded" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={() => {
                    onClose();
                    resetGame();
                  }}
                >
                  New Game
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
