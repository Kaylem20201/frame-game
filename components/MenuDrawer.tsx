"use client";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";

export default function MenuDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="rounded-2xl absolute" color="primary" onPress={onOpen} variant="solid">
        Open Drawer
      </Button>
      <Drawer isOpen={isOpen} size="2xl" placement='left'>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Game Settings</DrawerHeader>
              <DrawerBody>Test</DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
