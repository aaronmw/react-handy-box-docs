import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Popover } from '@/react-handy-box/components/Popover';
import { PopoverRenderProps } from '@/react-handy-box/components/Popover.types';
import { forwardRef, ReactNode, Ref, useRef } from 'react';

const variantPropMap = {
  normal: {
    backgroundColor: 'text',
    border: undefined,
    borderRadius: 'small',
    color: 'white',
    paddingX: 'tight',
    paddingY: 'xtight',
  },
} as const;

type TooltipProps = Omit<BoxPropsWithoutRef, 'content'> & {
  content: ReactNode;
  disabled?: boolean;
  variant?: keyof typeof variantPropMap;
};

const Tooltip = forwardRef(
  (
    {
      children,
      content,
      styles,
      variant = 'normal',
      ...otherProps
    }: TooltipProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hoistedPropsForTrigger = useRef<PopoverRenderProps | null>(null);

    const scheduleTooltipReveal = () => {
      cancelTooltipTimers();
      timerRef.current = setTimeout(revealTooltip, 300);
    };

    const scheduleTooltipDismissal = () => {
      cancelTooltipTimers();
      timerRef.current = setTimeout(dismissTooltip, 300);
    };

    const cancelTooltipTimers = () => {
      timerRef.current ? clearTimeout(timerRef.current) : null;
    };

    const dismissTooltip = () => {
      cancelTooltipTimers();
      hoistedPropsForTrigger.current?.setIsOpen(false);
    };

    const revealTooltip = () => {
      cancelTooltipTimers();
      hoistedPropsForTrigger.current?.setIsOpen(true);
    };

    const innerRenderTrigger = (renderProps: PopoverRenderProps) => {
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
    };

    return (
      <Popover
        disableBackdropClick={true}
        popperPlacementOrder={['top', 'bottom', 'left', 'right']}
        ref={ref}
        renderTrigger={innerRenderTrigger}
        styles={{
          ...variantPropMap[variant],
        }}
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
