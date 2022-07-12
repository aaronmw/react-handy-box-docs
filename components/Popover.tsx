import { ModalLayer } from "@/components/ModalLayer";
import { ModalLayerRenderProps } from "@/components/ModalLayer.types";
import { PopoverProps, PopoverRenderProps } from "@/components/Popover.types";
import { useMultipleRefs } from "@/hooks/useMultipleRefs";
import { Options, Placement } from "@popperjs/core";
import { forwardRef, MutableRefObject, Ref, useEffect, useState } from "react";
import { usePopper } from "react-popper";

const DEFAULT_POPPER_PLACEMENT_ORDER = [
  "bottom",
  "top",
  "left-start",
  "right-start",
] as Array<Placement>;

export const popperPlacementValues = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
];

const Popover = forwardRef(
  (
    {
      children,
      popperOptions,
      popperPlacementOrder = DEFAULT_POPPER_PLACEMENT_ORDER,
      renderTrigger,
      type = "popover",
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
          name: "flip",
          options: {
            fallbackPlacementOrder: popperPlacementOrder.slice(1),
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "preventOverflow",
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

    const addPopperRefToTriggerElement = (renderProps: ModalLayerRenderProps) =>
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
      } as PopoverRenderProps);

    return (
      <ModalLayer
        backgroundColor="white"
        border="normal"
        borderRadius="normal"
        boxShadow="normal"
        padding="tight"
        ref={multipleRefs}
        renderTrigger={(renderProps) =>
          renderTrigger(addPopperRefToTriggerElement(renderProps))
        }
        style={popperStyles}
        type={type}
        onBeforeClose={(renderProps) => {
          onBeforeClose?.(addPopperRefToTriggerElement(renderProps!));
        }}
        onBeforeOpen={(renderProps) => {
          onBeforeOpen?.(addPopperRefToTriggerElement(renderProps!));
        }}
        onClose={(renderProps) => {
          popperReferenceElement?.focus();
          onClose?.(addPopperRefToTriggerElement(renderProps!));
        }}
        onOpen={(renderProps) => {
          onOpen?.(addPopperRefToTriggerElement(renderProps!));
          updatePopper?.();
        }}
        {...popperAttributes}
        {...otherProps}
      >
        {(renderProps) => {
          if (typeof children === "function") {
            return children(addPopperRefToTriggerElement(renderProps));
          }

          return children as JSX.Element;
        }}
      </ModalLayer>
    );
  }
);

Popover.displayName = "Popover";

export { Popover };
