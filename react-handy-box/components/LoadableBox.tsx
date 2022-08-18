import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { forwardRef, ReactNode, Ref } from 'react';

export type LoadableBoxProps = Omit<BoxProps, 'ref'> & {
  isLoading: boolean;
  loadingMessage?: ReactNode;
  unmountWhileLoading?: boolean;
};

const loadingProps = {
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  opacity: 0.5,
  width: '100%',
};

const LoadableBox = forwardRef(
  (
    {
      children,
      isLoading,
      loadingMessage = 'Loading...',
      unmountWhileLoading = true,
      ...props
    }: LoadableBoxProps,
    ref: Ref<HTMLDivElement>
  ) => (
    <Box
      opacity={isLoading ? loadingProps.opacity : 1}
      position="relative"
      ref={ref}
      transitionDuration="long"
      transitionProperty="opacity"
      {...((isLoading ? loadingProps : {}) as BoxProps)}
      {...props}
    >
      {isLoading && (
        <Box
          alignItems="center"
          backgroundColor="shaded"
          height="100%"
          justifyContent="center"
          left={0}
          position="absolute"
          top={0}
          width="100%"
          zIndex="1000--maximum"
        >
          {loadingMessage}
        </Box>
      )}
      {unmountWhileLoading && isLoading ? '.' : children}
    </Box>
  )
);

LoadableBox.displayName = 'LoadableBox';

export { LoadableBox };
