import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { TypedJs } from "./typed";
import { Orbit, SendHorizontal } from "lucide-react";

export const ButtonAI = ({
  answer,
  question,
  loadingAI,
  handleAskQuestion,
  setQuestion,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div>
        <Button variant="faded" onPress={onOpen}>
          <Orbit size={20} />
          <p className="font-bold text-xs">Ask AI</p>
        </Button>
      </div>
      <Drawer isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                AI Response
              </DrawerHeader>
              <DrawerBody>
                <section className=" space-y-3">
                  <Textarea
                    type="text"
                    placeholder="Enter your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></Textarea>
                  <div className="flex justify-end">
                    <Button
                      variant="solid"
                      color="primary"
                      size="sm"
                      isLoading={loadingAI}
                      onPress={() => {
                        handleAskQuestion();
                        onOpen();
                      }}
                    >
                      <SendHorizontal />
                    </Button>
                  </div>
                </section>
                <TypedJs answer={answer} />
              </DrawerBody>
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
};
