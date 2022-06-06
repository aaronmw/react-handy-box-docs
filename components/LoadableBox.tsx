import { forwardRef, ReactNode, Ref } from 'react';
import { Box } from './Box';
import { BoxProps } from './Box.types';

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

// eslint-disable-next-line react/display-name
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