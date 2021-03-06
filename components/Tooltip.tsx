import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Popover } from '@/components/Popover';
import { PopoverRenderProps } from '@/components/Popover.types';
import { ReactNode, useRef } from 'react';

const variantPropMap = {
  normal: {
    backgroundColor: 'text',
    border: undefined,
    borderRadius: 'small',
    color: 'white',
    paddingX: 'tight',
    paddingY: 'xtight',
  },
};

type TooltipProps = Omit<BoxProps, 'content'> & {
  content: ReactNode;
  disabled?: boolean;
  variant?: keyof typeof variantPropMap;
};

const Tooltip = ({
  children,
  content,
  variant = 'normal',
  ...otherProps
}: TooltipProps) => {
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
        display="inline-block"
        ref={renderProps.propsForTrigger.ref as any}
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
      renderTrigger={innerRenderTrigger}
      type="tooltip"
      onMouseEnter={cancelTooltipTimers}
      onMouseLeave={scheduleTooltipDismissal}
      {...(variantPropMap[variant] as any)}
    >
      {content}
    </Popover>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
