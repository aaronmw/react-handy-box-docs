import { Box } from '@/react-handy-box/components/Box';
import { IconProps } from '@/react-handy-box/components/Icon.types';
import { forwardRef, Ref } from 'react';

const Icon = forwardRef(
  (
    {
      name = 'face-sad-sweat',
      styles,
      variant = 'regular',
      ...otherProps
    }: IconProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <Box
      as="span"
      className={`fa-${variant} fa-${name} fa-1x fa-fw`}
      key={`${name}-${variant}`}
      ref={ref}
      styles={{
        display: 'inline-block',
        ...styles,
      }}
      {...otherProps}
    />
  )
);

Icon.displayName = 'Icon';

export { Icon };
