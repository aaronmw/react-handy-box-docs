import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';

type HeadingComponentProps = BoxPropsWithoutRef<'h1'> & {};

const Heading = ({ children, ...otherProps }: HeadingComponentProps) => {
  return <Box {...otherProps}>{children}</Box>;
};

export { Heading };
