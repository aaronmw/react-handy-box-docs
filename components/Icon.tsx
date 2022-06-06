import { forwardRef, Ref } from 'react';
import { Box } from './Box';
import { IconProps } from './Icon.types';

// eslint-disable-next-line react/display-name
const Icon = forwardRef(
  (
    { name = 'face-sad-sweat', variant = 'regular', ...props }: IconProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <Box
      as="span"
      display="inline-block"
      className={`fa-${variant} fa-${name} fa-1x fa-fw`}
      key={`${name}-${variant}`}
      ref={ref}
      {...props}
    />
  )
);

export { Icon };
