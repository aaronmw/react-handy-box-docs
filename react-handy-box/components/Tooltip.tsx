import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Popover } from '@/react-handy-box/components/Popover';
import { PopoverRenderProps } from '@/react-handy-box/components/Popover.types';
import { modalLayerStyles } from '@/tokens/modalLayerStyles';
import { forwardRef, ReactNode, Ref, useCallback, useRef } from 'react';

type TooltipProps = Omit<BoxPropsWithoutRef, 'content'> & {
  content: ReactNode;
  disabled?: boolean;
};

const Tooltip = forwardRef(
  (
    { children, content, styles, ...otherProps }: TooltipProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hoistedPropsForTrigger = useRef<PopoverRenderProps | null>(null);

    const cancelTooltipTimers = useCallback(() => {
      timerRef.current ? clearTimeout(timerRef.current) : null;
    }, []);

    const dismissTooltip = useCallback(() => {
      cancelTooltipTimers();
      hoistedPropsForTrigger.current?.setIsOpen(false);
    }, [cancelTooltipTimers]);

    const revealTooltip = useCallback(() => {
      cancelTooltipTimers();
      hoistedPropsForTrigger.current?.setIsOpen(true);
    }, [cancelTooltipTimers]);

    const scheduleTooltipReveal = useCallback(() => {
      cancelTooltipTimers();
      timerRef.current = setTimeout(revealTooltip, 300);
    }, [cancelTooltipTimers, revealTooltip]);

    const scheduleTooltipDismissal = useCallback(() => {
      cancelTooltipTimers();
      timerRef.current = setTimeout(dismissTooltip, 300);
    }, [cancelTooltipTimers, dismissTooltip]);

    const innerRenderTrigger = useCallback(
      (renderProps: PopoverRenderProps) => {
        hoistedPropsForTrigger.current = renderProps;

        return (
          <Box
            ref={renderProps.propsForTrigger.ref as any}
            styles={{
              display: 'inline-block',
              ...styles,
            }}
            onMouseEnter={scheduleTooltipReveal}
            onMouseLeave={scheduleTooltipDismissal}
            {...otherProps}
          >
            {children}
          </Box>
        );
      },
      [
        children,
        otherProps,
        scheduleTooltipDismissal,
        scheduleTooltipReveal,
        styles,
      ]
    );

    return (
      <Popover
        disableBackdropClick={true}
        popperPlacementOrder={['top', 'bottom', 'left', 'right']}
        ref={ref}
        renderTrigger={innerRenderTrigger}
        styles={modalLayerStyles.tooltip}
        type="tooltip"
        onMouseEnter={cancelTooltipTimers}
        onMouseLeave={scheduleTooltipDismissal}
      >
        {content}
      </Popover>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
