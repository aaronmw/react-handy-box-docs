import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { forwardRef, MouseEventHandler, Ref } from 'react';

type PropagationStopperProps = Omit<BoxProps<'div'>, 'ref'> & {
  disabled?: boolean;
};

const PropagationStopper = forwardRef(
  (
    { children, disabled, ...otherProps }: PropagationStopperProps,
    ref: Ref<HTMLDivElement>
  ): JSX.Element => {
    const handleClick: MouseEventHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Box
        onClick={!disabled ? handleClick : undefined}
        ref={ref}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

PropagationStopper.displayName = 'PropagationStopper';

export { PropagationStopper };
