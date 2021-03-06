import { ModalLayer } from '@/components/ModalLayer';
import { ModalLayerRenderProps } from '@/components/ModalLayer.types';
import { PopoverProps, PopoverRenderProps } from '@/components/Popover.types';
import { useMultipleRefs } from '@/hooks/useMultipleRefs';
import { Options, Placement } from '@popperjs/core';
import {
  forwardRef,
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { usePopper } from 'react-popper';

const DEFAULT_POPPER_PLACEMENT_ORDER = [
  'bottom',
  'top',
  'left-start',
  'right-start',
] as Array<Placement>;

export const popperPlacementValues = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
];

const Popover = forwardRef(
  (
    {
      children,
      popperOptions,
      popperPlacementOrder = DEFAULT_POPPER_PLACEMENT_ORDER,
      renderTrigger,
      type = 'popover',
      onBeforeClose,
      onBeforeOpen,
      onClose,
      onOpen,
      ...otherProps
    }: PopoverProps,
    outerRef: Ref<HTMLElement>
  ) => {
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null
    );
    const [popperReferenceElement, setPopperReferenceElement] =
      useState<HTMLElement | null>(null);
    const multipleRefs = useMultipleRefs(outerRef, setPopperElement);

    const {
      styles: { popper: popperStyles },
      attributes: { popper: popperAttributes },
      update: updatePopper,
    } = usePopper(popperReferenceElement, popperElement, {
      ...(popperOptions ?? {}),
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacementOrder: popperPlacementOrder.slice(1),
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            padding: 12,
          },
        },
        ...(popperOptions?.modifiers ?? []),
      ],
      placement: popperPlacementOrder[0],
    } as Partial<Options>);

    useEffect(() => {
      updatePopper?.();
    }, [children, updatePopper]);

    const addPopperRefToTriggerElement = useCallback(
      (renderProps: ModalLayerRenderProps) =>
        ({
          ...renderProps,
          propsForTrigger: {
            ...renderProps.propsForTrigger,
            ref: (ref) => {
              if (!ref) {
                return;
              }

              (
                renderProps.propsForTrigger
                  .ref as MutableRefObject<HTMLButtonElement>
              ).current = ref;

              setPopperReferenceElement(ref);
            },
          },
          updatePopper,
        } as PopoverRenderProps),
      [updatePopper]
    );

    const renderTriggerCallback = useCallback(
      (renderProps: PopoverRenderProps) =>
        renderTrigger(addPopperRefToTriggerElement(renderProps)),
      [addPopperRefToTriggerElement, renderTrigger]
    );

    const onBeforeCloseCallback = useCallback(
      (renderProps: PopoverRenderProps) => {
        onBeforeClose?.(addPopperRefToTriggerElement(renderProps!));
      },
      [addPopperRefToTriggerElement, onBeforeClose]
    );

    const onBeforeOpenCallback = useCallback(
      (renderProps: PopoverRenderProps) => {
        onBeforeOpen?.(addPopperRefToTriggerElement(renderProps!));
      },
      [addPopperRefToTriggerElement, onBeforeOpen]
    );

    const onCloseCallback = useCallback(
      (renderProps: PopoverRenderProps) => {
        popperReferenceElement?.focus();
        onClose?.(addPopperRefToTriggerElement(renderProps!));
      },
      [addPopperRefToTriggerElement, onClose, popperReferenceElement]
    );

    const onOpenCallback = useCallback(
      (renderProps: PopoverRenderProps) => {
        onOpen?.(addPopperRefToTriggerElement(renderProps!));
        updatePopper?.();
      },
      [addPopperRefToTriggerElement, onOpen, updatePopper]
    );

    return (
      <ModalLayer
        backgroundColor="white"
        border="normal"
        borderRadius="normal"
        boxShadow="normal"
        padding="tight"
        ref={multipleRefs}
        renderTrigger={renderTriggerCallback}
        style={popperStyles}
        type={type}
        onBeforeClose={onBeforeCloseCallback}
        onBeforeOpen={onBeforeOpenCallback}
        onClose={onCloseCallback}
        onOpen={onOpenCallback}
        {...popperAttributes}
        {...(otherProps as any)}
      >
        {(renderProps) => {
          if (typeof children === 'function') {
            return children(addPopperRefToTriggerElement(renderProps));
          }

          return children as JSX.Element;
        }}
      </ModalLayer>
    );
  }
);

Popover.displayName = 'Popover';

export { Popover };
