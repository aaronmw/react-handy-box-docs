import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Form } from '@/react-handy-box/components/Form';
import { Icon } from '@/react-handy-box/components/Icon';
import {
  ModalLayer,
  ModalLayerContext,
} from '@/react-handy-box/components/ModalLayer';
import { ModalWindowProps } from '@/react-handy-box/components/ModalLayer.types';
import { ScrollableBox } from '@/react-handy-box/components/ScrollableBox';
import { useDOMWatcher } from '@/react-handy-box/hooks/useDOMWatcher';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { whiteSpacesAsCSSVariables } from '@/tokens/whiteSpaces';
import {
  forwardRef,
  MouseEvent,
  Ref,
  useContext,
  useEffect,
  useRef,
} from 'react';

export const variantPropMap = {
  small: {
    width: 300,
  },
  normal: {
    width: 550,
  },
  large: {
    width: 800,
  },
  fullscreen: {
    height: '100vh',
    width: '100vw',
  },
} as const;

const ModalWindow = forwardRef(
  (
    {
      children,
      disableBackdropClick,
      propsForForm,
      renderFooter,
      renderHeader,
      styles,
      type = 'window',
      variant = 'normal',
      ...otherProps
    }: ModalWindowProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { modalLayerStack } = useContext(ModalLayerContext);

    const innerRef = useRef<HTMLElement>(null);

    const multipleRefs = useMultipleRefs(ref, innerRef);

    const { addDOMWatcher, removeDOMWatcher } = useDOMWatcher();

    const modalWindowsInStack = modalLayerStack.current.filter(
      (layer) => layer.type === 'window'
    );

    const isLowestModalWindowInStack =
      modalWindowsInStack.length === 0 ||
      modalWindowsInStack[0].element.isSameNode(innerRef.current);

    useEffect(() => {
      if (isLowestModalWindowInStack) {
        const positionMultipleWindows = () => {
          modalWindowsInStack.reverse().forEach((modalLayer, windowIndex) => {
            const offset = `calc(${whiteSpacesAsCSSVariables.normal} * -${windowIndex})`;

            modalLayer.element.style.marginLeft = offset;
            modalLayer.element.style.marginTop = offset;
          });
        };

        addDOMWatcher(positionMultipleWindows);

        return () => {
          removeDOMWatcher(positionMultipleWindows);
        };
      }
    }, [
      addDOMWatcher,
      isLowestModalWindowInStack,
      modalLayerStack,
      modalWindowsInStack,
      removeDOMWatcher,
    ]);

    const propsForBackdrop = {
      styles: {
        ...(isLowestModalWindowInStack ? { backgroundColor: 'shadow' } : {}),
        ...(disableBackdropClick === true ? { pointerEvents: 'none' } : {}),
      },
    } as BoxPropsWithoutRef;

    const WrapperComponent = propsForForm ? Form : Box;

    return (
      <>
        <ModalLayer
          aria-describedby="modalWindowContent"
          aria-labelledby="modalWindowTitle"
          propsForBackdrop={propsForBackdrop}
          ref={multipleRefs}
          styles={{
            backgroundColor: 'white',
            border: 'normal',
            borderRadius: 'normal',
            boxShadow: 'normal',
            display: 'flex',
            left: '50%',
            maxHeight: `calc(100vh - ${whiteSpacesAsCSSVariables.normal} * 2)`,
            maxWidth: `calc(100vw - ${whiteSpacesAsCSSVariables.normal} * 2)`,
            position: 'fixed',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            transitionProperty: [
              'filter',
              'margin-left',
              'margin-top',
              'opacity',
              'transform',
            ],
            ...variantPropMap[variant],
            ...styles,
          }}
          type={type}
          {...(otherProps as any)}
        >
          {(renderProps) => {
            const resolvedPropsForForm =
              (typeof propsForForm === 'function'
                ? propsForForm(renderProps)
                : propsForForm) ?? {};

            return (
              <WrapperComponent
                styles={{
                  alignItems: 'stretch',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: 'stretch',
                  ...resolvedPropsForForm.styles,
                }}
                {...resolvedPropsForForm}
              >
                <Box
                  styles={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 'tight',
                    top: 'tight',
                    zIndex: '1--stickyElements',
                  }}
                >
                  <Button
                    aria-label="Close Window"
                    variant="iconOnly"
                    onClick={(event: MouseEvent) => {
                      event.preventDefault();
                      event.stopPropagation();
                      renderProps.closeModal();
                    }}
                  >
                    <Icon name="xmark" />
                  </Button>
                </Box>

                {renderHeader && (
                  <Box
                    as="header"
                    styles={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'normal',
                    }}
                  >
                    {renderHeader(renderProps)}
                  </Box>
                )}

                <ScrollableBox
                  as="main"
                  className="js-modal-window-scrolling-element"
                  id="modalWindowContent"
                  styles={{
                    flexGrow: 1,
                    flexShrink: 1,
                  }}
                >
                  <Box
                    styles={{
                      paddingBottom: renderFooter ? undefined : 'normal',
                      paddingTop: renderHeader ? undefined : 'normal',
                      paddingX: 'normal',
                    }}
                  >
                    {typeof children === 'function'
                      ? children(renderProps)
                      : children}
                  </Box>
                </ScrollableBox>

                {renderFooter && (
                  <Box
                    as="footer"
                    styles={{
                      paddingX: 'normal',
                      paddingY: 'tight',
                    }}
                  >
                    {renderFooter(renderProps)}
                  </Box>
                )}
              </WrapperComponent>
            );
          }}
        </ModalLayer>
      </>
    );
  }
);

ModalWindow.displayName = 'ModalWindow';

export { ModalWindow };
