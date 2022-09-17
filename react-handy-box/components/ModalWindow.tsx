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
import { Tooltip } from '@/react-handy-box/components/Tooltip';
import { useDOMWatcher } from '@/react-handy-box/hooks/useDOMWatcher';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { modalLayerStyles } from '@/tokens/modalLayerStyles';
import merge from 'lodash/merge';
import {
  forwardRef,
  MouseEvent,
  Ref,
  useContext,
  useEffect,
  useRef,
} from 'react';

export const variantStylesMap = {
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
      stylesForBackdrop,
      stylesForBackdropOnClose,
      stylesForBackdropOnOpen,
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
            const offset = `calc(var(--white-space--normal) * -${windowIndex})`;

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

    const WrapperComponent = propsForForm ? Form : Box;

    return (
      <>
        <ModalLayer
          aria-describedby="modalWindowContent"
          aria-labelledby="modalWindowTitle"
          ref={multipleRefs}
          styles={merge(
            {},
            modalLayerStyles.window,
            variantStylesMap[variant],
            styles
          )}
          stylesForBackdrop={merge(
            isLowestModalWindowInStack
              ? {
                  animationFillMode: 'forwards',
                  backgroundColor: 'shadow',
                  ...stylesForBackdrop,
                }
              : {},
            disableBackdropClick === true ? { pointerEvents: 'none' } : {}
          )}
          stylesForBackdropOnClose={{
            animationName: 'backdropExit',
            opacity: 0,
          }}
          stylesForBackdropOnOpen={{
            animationName: 'backdropEntry',
            opacity: 1,
          }}
          stylesOnClose={{
            animationName: 'modalWindowExit',
            opacity: 0,
          }}
          stylesOnOpen={{
            animationName: 'modalWindowEntry',
            opacity: 1,
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
                  <Tooltip content="Close Window">
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
                  </Tooltip>
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
                    paddingBottom: renderFooter ? undefined : 'normal',
                    paddingTop: renderHeader ? undefined : 'normal',
                    paddingX: 'normal',
                    width: '100%',
                  }}
                >
                  {typeof children === 'function'
                    ? children(renderProps)
                    : children}
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
