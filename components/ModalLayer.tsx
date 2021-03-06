import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { FocusTrap } from '@/components/FocusTrap';
import {
  ModalLayerContextObject,
  ModalLayerProps,
  ModalLayerRenderProps,
  ModalLayerStack,
} from '@/components/ModalLayer.types';
import { KeyMap, useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/hooks/useMultipleRefs';
import { zIndices } from '@/tokens/zIndices';
import last from 'lodash/last';
import omit from 'lodash/omit';
import { ExtendedKeyboardEvent } from 'mousetrap';
import {
  createContext,
  forwardRef,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export const ModalLayerContext = createContext<ModalLayerContextObject>({
  modalLayerStack: { current: [] },
});

const ModalLayerProvider = ({ children }: { children: ReactNode }) => {
  const modalLayerStack = useRef<ModalLayerStack>([]);

  const memoizedKeyMap = useMemo<KeyMap>(() => {
    const keysToListenFor = ['escape'];

    const handler = (event: ExtendedKeyboardEvent, combo: string) => {
      if (!modalLayerStack.current.length) {
        return;
      }

      switch (combo) {
        case 'escape':
          event.preventDefault();
          last(modalLayerStack.current)?.setIsOpen(false);
          break;
      }

      return false;
    };

    return Object.fromEntries(
      keysToListenFor.map((key) => [key, handler])
    ) as KeyMap;
  }, []);

  useKeyboardShortcuts(memoizedKeyMap);

  const modalLayerContext = useMemo(
    () => ({
      modalLayerStack,
    }),
    []
  );

  return (
    <ModalLayerContext.Provider value={modalLayerContext}>
      {children}
    </ModalLayerContext.Provider>
  );
};

const BackdroppedBox = ({ children, ...otherProps }: BoxProps) => {
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
      isOpen = initialIsOpen,
      renderTrigger,
      type,
      onBeforeClose,
      onBeforeOpen,
      onClose,
      onOpen,
      ...otherProps
    }: ModalLayerProps,
    outerRef: Ref<HTMLDivElement>
  ) => {
    const [desiredOpenState, setDesiredOpenState] = useState(isOpen);

    const [internalOpenState, setInternalOpenState] = useState<
      'opening' | 'open' | 'closing' | 'closed'
    >('closed');

    const [opacity, setOpacity] = useState(0);

    const [modalLayerElement, setModalLayerElement] =
      useState<HTMLElement | null>(null);

    const triggerElementRef = useRef<HTMLButtonElement | null>(null);

    const multipleRefs = useMultipleRefs(outerRef, setModalLayerElement);

    const { modalLayerStack } = useContext(ModalLayerContext);

    const modalLayerStackIndex = Math.max(
      0,
      modalLayerStack.current.findIndex((modalLayer) =>
        modalLayerElement
          ? modalLayer.element.isSameNode(modalLayerElement)
          : false
      )
    );

    const renderProps = useMemo<ModalLayerRenderProps>(
      () =>
        ({
          closeModal: () => {
            setDesiredOpenState(false);
          },
          isOpen: desiredOpenState,
          modalLayerElementRef: {
            current: modalLayerElement,
          },
          propsForTrigger: {
            ref: triggerElementRef,
            onClick: (event: MouseEvent) => {
              event.preventDefault();
              setDesiredOpenState(!desiredOpenState);
            },
          },
          setIsOpen: setDesiredOpenState,
          triggerElementRef,
        } as ModalLayerRenderProps),
      [desiredOpenState, modalLayerElement]
    );

    useEffect(() => {
      if (typeof isOpen === 'boolean') {
        setDesiredOpenState(isOpen);
      }
    }, [isOpen]);

    useEffect(() => {
      if (!modalLayerElement) {
        return;
      }

      modalLayerStack.current.push({
        element: modalLayerElement,
        setIsOpen: setDesiredOpenState,
        type,
      });

      return () => {
        modalLayerStack.current = modalLayerStack.current.filter(
          (modalLayer) =>
            modalLayer.element.isSameNode(modalLayerElement) === false
        );
      };
    }, [modalLayerElement, modalLayerStack, type]);

    useEffect(() => {
      if (
        (desiredOpenState === false &&
          ['closed', 'closing'].includes(internalOpenState)) ||
        (desiredOpenState === true &&
          ['open', 'opening'].includes(internalOpenState))
      ) {
        return;
      }

      const nextInternalOpenState =
        desiredOpenState === true ? 'opening' : 'closing';

      const eventHandler =
        desiredOpenState === true ? onBeforeOpen : onBeforeClose;

      setInternalOpenState(nextInternalOpenState);

      eventHandler?.(renderProps);
    }, [
      desiredOpenState,
      internalOpenState,
      onBeforeClose,
      onBeforeOpen,
      renderProps,
    ]);

    useEffect(() => {
      if (['opening', 'closing'].includes(internalOpenState) === false) {
        return;
      }

      setOpacity(internalOpenState === 'opening' ? 1 : 0);
    }, [internalOpenState]);

    const handleTransitionEnd = useCallback(() => {
      if (['opening', 'closing'].includes(internalOpenState) === false) {
        return;
      }

      const nextInternalOpenState =
        internalOpenState === 'closing' ? 'closed' : 'open';

      const eventHandler = internalOpenState === 'closing' ? onClose : onOpen;

      setInternalOpenState(nextInternalOpenState);

      eventHandler?.(renderProps);
    }, [internalOpenState, onClose, onOpen, renderProps]);

    const handleClickBackdrop = (event: MouseEvent<HTMLDivElement>) => {
      if (!disableBackdropClick) {
        renderProps.closeModal();
        propsForBackdrop?.onClick?.(event);
      }
    };

    const backdropOpacity = opacity ? propsForBackdrop?.opacity ?? opacity : 0;

    const zIndex = zIndices['10--modalWindows'] + modalLayerStackIndex;

    return (
      <>
        {renderTrigger?.(renderProps)}
        {internalOpenState !== 'closed' &&
          createPortal(
            <BackdroppedBox
              cursor="default"
              opacity={backdropOpacity}
              pointerEvents={disableBackdropClick ? 'none' : 'all'}
              transitionProperty="opacity"
              zIndex={zIndex - 1}
              {...omit(propsForBackdrop, 'opacity')}
              onClick={handleClickBackdrop}
            >
              <FocusTrap
                data-modal-layer-type={type}
                disabled={Boolean(
                  disableFocusTrap ||
                    ['closing', 'closed'].includes(internalOpenState)
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
                {typeof children === 'function'
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

ModalLayer.displayName = 'ModalLayer';

export { ModalLayer, ModalLayerProvider };
