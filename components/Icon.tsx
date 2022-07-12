import { Box } from '@/components/Box';
import { IconProps } from '@/components/Icon.types';
import { forwardRef, Ref } from 'react';

const Icon = forwardRef(
  (
    { name = 'face-sad-sweat', variant = 'regular', ...props }: IconProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <Box
      as="span"
      className={`fa-${variant} fa-${name} fa-1x fa-fw`}
      display="inline-block"
      key={`${name}-${variant}`}
      ref={ref}
      {...props}
    />
  )
);

Icon.displayName = 'Icon';

export { Icon };
