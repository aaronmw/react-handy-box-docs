import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { forwardRef, ReactNode, Ref } from 'react';

export type LoadableBoxProps = Omit<BoxProps<'div'>, 'ref'> & {
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
      {...((isLoading ? loadingProps : {}) as BoxProps<'div'>)}
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
          zIndex="10"
        >
          {loadingMessage}
        </Box>
      )}
      {unmountWhileLoading && isLoading ? '.' : children}
    </Box>
  )
);

export { LoadableBox };
