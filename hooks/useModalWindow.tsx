import { ModalWindowProps } from "@/components/ModalLayer.types";
import { ModalWindow } from "@/components/ModalWindow";
import { useRef, useState } from "react";

const useModalWindow = ({ initialIsOpen = false } = {}) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(initialIsOpen);
  const modalWindowTriggerElementRef = useRef<HTMLButtonElement>(null);

  const ControlledModalWindow = (props: ModalWindowProps) =>
    isModalWindowOpen ? (
      <ModalWindow
        {...props}
        initialIsOpen={true}
        onBeforeClose={() => {
          props?.onBeforeClose?.();
          modalWindowTriggerElementRef?.current?.focus();
        }}
        onClose={() => {
          props?.onClose?.();
          setIsModalWindowOpen(false);
        }}
      />
    ) : null;

  return {
    ModalWindow: ControlledModalWindow,
    setIsModalWindowOpen,
    modalWindowTriggerElementRef,
  };
};

export { useModalWindow };
