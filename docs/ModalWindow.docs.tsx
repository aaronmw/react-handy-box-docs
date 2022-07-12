import { Button } from "@/components/Button";
import { useModalWindow } from "@/hooks/useModalWindow";
import { DocumentationPageDescriptor } from "@/pages/index";

const ModalWindowDemo = () => {
  const { ModalWindow, setIsModalWindowOpen, modalWindowTriggerElementRef } =
    useModalWindow();

  return (
    <>
      <Button
        ref={modalWindowTriggerElementRef}
        onClick={() => setIsModalWindowOpen(true)}
      >
        Open a Modal
      </Button>
      <ModalWindow>I am a modal window.</ModalWindow>
    </>
  );
};

const docs: DocumentationPageDescriptor = {
  title: "ModalWindow",
  demos: [
    {
      title: "Usage",
      renderDemo: () => <ModalWindowDemo />,
      renderSnippet: () => `
        const ModalWindowDemo = () => {
          const {
            ModalWindow,
            setIsModalWindowOpen,
            modalWindowTriggerElementRef,
          } = useModalWindow();

          return (
            <>
              <Button
                ref={modalWindowTriggerElementRef}
                onClick={() =>
                  setIsModalWindowOpen(true)
                }
              >
                Open a Modal
              </Button>
              <ModalWindow>
                I am a modal window.
              </ModalWindow>
            </>
          );
        };
      `,
      highlightLines: [6],
    },
  ],
};

export default docs;
