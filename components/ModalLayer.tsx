import { Box } from "@/components/Box";
import { BoxProps } from "@/components/Box.types";
import { FocusTrap } from "@/components/FocusTrap";
import {
  ModalLayerContextObject,
  ModalLayerProps,
  ModalLayerRenderProps,
  ModalLayerStack,
} from "@/components/ModalLayer.types";
import { KeyMap, useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useMultipleRefs } from "@/hooks/useMultipleRefs";
import { zIndices } from "@/tokens/zIndices";
import last from "lodash/last";
import omit from "lodash/omit";
import { ExtendedKeyboardEvent } from "mousetrap";
import {
  createContext,
  forwardRef,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export const ModalLayerContext = createContext<ModalLayerContextObject>({
  modalLayerStack: [],
  setModalLayerStack: () => null,
});

const ModalLayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalLayerStack, setModalLayerStack] = useState<ModalLayerStack>([]);

  const memoizedKeyMap = useMemo<KeyMap>(() => {
    const keysToListenFor = ["escape"];

    const handler = (event: ExtendedKeyboardEvent, combo: string) => {
      if (!modalLayerStack.length) {
        return;
      }

      switch (combo) {
        case "escape":
          event.preventDefault();
          last(modalLayerStack)?.setIsOpen(false);
          break;
      }

      return false;
    };

    return Object.fromEntries(
      keysToListenFor.map((key) => [key, handler])
    ) as KeyMap;
  }, [modalLayerStack]);

  useKeyboardShortcuts(memoizedKeyMap);

  const modalLayerContext = {
    modalLayerStack,
    setModalLayerStack,
  } as ModalLayerContextObject;

  return (
    <ModalLayerContext.Provider value={modalLayerContext}>
      {children}
    </ModalLayerContext.Provider>
  );
};

const BackdroppedBox = ({ children, ...otherProps }: BoxProps<"div">) => {
  return (
    <>
      <Box
        height="100vh"
        left={0}
        position="fixed"
        top={0}
        width="100vw"
        {...otherProps}
      />

      {children}
    </>
  );
};

const ModalLayer = forwardRef(
  (
    {
      propsForBackdrop,
      children,
      disableBackdropClick = false,
      disableFocusTrap = false,
      initialIsOpen = false,
      renderTrigger,
      type,
      onBeforeClose,
      onBeforeOpen,
      onClose,
      onOpen,
      ...otherProps
    }: ModalLayerProps,
    outerRef
  ) => {
    const [externalOpenState, setExternalOpenState] = useState(initialIsOpen);
    const [internalOpenState, setInternalOpenState] = useState<
      "opening" | "open" | "closing" | "closed"
    >("closed");
    const [opacity, setOpacity] = useState(0);
    const [modalLayerElement, setModalLayerElement] =
      useState<HTMLElement | null>(null);
    const triggerElementRef = useRef<HTMLButtonElement | null>(null);
    const multipleRefs = useMultipleRefs(outerRef, setModalLayerElement);

    const { modalLayerStack, setModalLayerStack } =
      useContext(ModalLayerContext);

    const modalLayerStackIndex = modalLayerStack.findIndex((modalLayer) =>
      modalLayerElement
        ? modalLayer.element.isSameNode(modalLayerElement)
        : false
    );

    const renderProps = useMemo<ModalLayerRenderProps>(
      () =>
        ({
          closeModal: () => {
            setExternalOpenState(false);
          },
          isOpen: externalOpenState,
          modalLayerElementRef: {
            current: modalLayerElement,
          },
          propsForTrigger: {
            ref: triggerElementRef,
            onClick: (event: MouseEvent) => {
              event.preventDefault();
              setExternalOpenState(!externalOpenState);
            },
          },
          setIsOpen: setExternalOpenState,
          triggerElementRef,
        } as ModalLayerRenderProps),
      [externalOpenState, modalLayerElement]
    );

    useEffect(() => {
      if (!modalLayerElement) {
        return;
      }

      setModalLayerStack((currentModalLayerStack) => [
        ...currentModalLayerStack,
        {
          element: modalLayerElement,
          setIsOpen: setExternalOpenState,
          type,
        },
      ]);

      return () => {
        setModalLayerStack((currentModalLayerStack) =>
          currentModalLayerStack.filter(
            (modalLayer) =>
              modalLayer.element.isSameNode(modalLayerElement) === false
          )
        );
      };
    }, [modalLayerElement, setModalLayerStack, type]);

    useEffect(() => {
      if (
        (externalOpenState === false && internalOpenState === "closed") ||
        (externalOpenState === true && internalOpenState === "open")
      ) {
        return;
      }

      const nextInternalOpenState =
        externalOpenState === true ? "opening" : "closing";

      const eventHandler =
        externalOpenState === true ? onBeforeOpen : onBeforeClose;

      setInternalOpenState(nextInternalOpenState);
      eventHandler?.(renderProps);
    }, [
      externalOpenState,
      internalOpenState,
      onBeforeClose,
      onBeforeOpen,
      renderProps,
    ]);

    useEffect(() => {
      if (["opening", "closing"].includes(internalOpenState) === false) {
        return;
      }

      setOpacity(internalOpenState === "opening" ? 1 : 0);
    }, [internalOpenState]);

    const handleTransitionEnd = useCallback(() => {
      if (["opening", "closing"].includes(internalOpenState) === false) {
        return;
      }

      const nextInternalOpenState =
        internalOpenState === "closing" ? "closed" : "open";
      const eventHandler = internalOpenState === "closing" ? onClose : onOpen;

      setInternalOpenState(nextInternalOpenState);
      eventHandler?.(renderProps);
    }, [internalOpenState, onClose, onOpen, renderProps]);

    const backdropOpacity = opacity ? propsForBackdrop?.opacity ?? opacity : 0;

    const zIndex = zIndices["10--modalWindows"] + modalLayerStackIndex;

    return (
      <>
        {renderTrigger?.(renderProps)}
        {internalOpenState !== "closed" &&
          createPortal(
            <BackdroppedBox
              cursor="default"
              opacity={backdropOpacity}
              pointerEvents={disableBackdropClick ? "none" : "all"}
              transitionProperty="opacity"
              zIndex={zIndex - 1}
              onClick={() => {
                setExternalOpenState(false);
              }}
              {...omit(propsForBackdrop, "opacity")}
            >
              <FocusTrap
                as="section"
                data-modal-layer-type={type}
                disabled={Boolean(
                  disableFocusTrap ||
                    ["closing", "closed"].includes(internalOpenState)
                )}
                opacity={opacity}
                ref={multipleRefs}
                role="dialog"
                tabIndex={0}
                transitionProperty="opacity"
                zIndex={zIndex}
                onTransitionEnd={handleTransitionEnd}
                {...otherProps}
              >
                {typeof children === "function"
                  ? children(renderProps)
                  : children}
              </FocusTrap>
            </BackdroppedBox>,
            document.body
          )}
      </>
    );
  }
);

ModalLayer.displayName = "ModalLayer";

export { ModalLayer, ModalLayerProvider };
