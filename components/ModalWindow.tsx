import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Icon } from '@/components/Icon';
import { ModalLayer, ModalLayerContext } from '@/components/ModalLayer';
import { ModalWindowProps } from '@/components/ModalLayer.types';
import { ScrollableBox } from '@/components/ScrollableBox';
import { useDOMWatcher } from '@/hooks/useDOMWatcher';
import { useMultipleRefs } from '@/hooks/useMultipleRefs';
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
      type = 'window',
      variant = 'normal',
      ...otherProps
    }: ModalWindowProps,
    outerRef: Ref<HTMLElement>
  ) => {
    const { modalLayerStack } = useContext(ModalLayerContext);

    const innerRef = useRef<HTMLElement>(null);

    const multipleRefs = useMultipleRefs(outerRef, innerRef);

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
      ...(isLowestModalWindowInStack ? { backgroundColor: 'shadow' } : {}),
      ...(disableBackdropClick === true ? { pointerEvents: 'none' } : {}),
    } as Omit<BoxProps, 'ref'>;

    const WrapperComponent = propsForForm ? Form : Box;

    return (
      <>
        <ModalLayer
          aria-describedby="modalWindowContent"
          aria-labelledby="modalWindowTitle"
          propsForBackdrop={propsForBackdrop}
          backgroundColor="white"
          border="normal"
          borderRadius="normal"
          boxShadow="normal"
          display="flex"
          left="50%"
          maxHeight={`calc(100vh - ${whiteSpacesAsCSSVariables.normal} * 2)`}
          maxWidth={`calc(100vw - ${whiteSpacesAsCSSVariables.normal} * 2)`}
          position="fixed"
          ref={multipleRefs}
          top="50%"
          transform="translate(-50%, -50%)"
          transitionProperty={[
            'filter',
            'margin-left',
            'margin-top',
            'opacity',
            'transform',
          ]}
          type={type}
          {...variantPropMap[variant]}
          {...(otherProps as any)}
        >
          {(renderProps) => (
            <WrapperComponent
              alignItems="stretch"
              display="flex"
              flexDirection="column"
              flexGrow={1}
              flexShrink={1}
              justifyContent="stretch"
              {...((typeof propsForForm === 'function'
                ? propsForForm(renderProps)
                : propsForForm) ?? {})}
            >
              <Box
                alignSelf="flex-end"
                position="absolute"
                top="tight"
                right="tight"
                zIndex="1--stickyElements"
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
                  alignItems="center"
                  as="header"
                  justifyContent="space-between"
                  padding="normal"
                >
                  {renderHeader(renderProps)}
                </Box>
              )}

              <ScrollableBox
                as="main"
                id="modalWindowContent"
                flexGrow={1}
                flexShrink={1}
                paddingBottom={renderFooter ? undefined : 'normal'}
                paddingTop={renderHeader ? undefined : 'normal'}
                paddingX="normal"
              >
                {typeof children === 'function'
                  ? children(renderProps)
                  : children}
              </ScrollableBox>

              {renderFooter && (
                <Box as="footer" padding="normal">
                  {renderFooter(renderProps)}
                </Box>
              )}
            </WrapperComponent>
          )}
        </ModalLayer>
      </>
    );
  }
);

ModalWindow.displayName = 'ModalWindow';

export { ModalWindow };
