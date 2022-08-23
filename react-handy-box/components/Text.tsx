import { Box } from '@/react-handy-box/components/Box';
import { BoxProps, StyleProps } from '@/react-handy-box/components/Box.types';
import { textStyles } from '@/tokens/typography';
import { forwardRef, Ref } from 'react';

type TextProps<E extends keyof JSX.IntrinsicElements = 'span'> = Omit<
  BoxProps<E>,
  'size' | 'style'
> & {
  size?: StyleProps['fontSize'];
  style?: StyleProps['fontStyle'];
  variant?: keyof typeof textStyles;
  weight?: StyleProps['fontWeight'];
};

const Text = forwardRef(
  (
    {
      children,
      size,
      style,
      styles,
      variant = 'normal',
      weight,
      ...otherProps
    }: TextProps,
    ref: Ref<HTMLSpanElement>
  ) => {
    const { styles: variantStyles, ...variantProps } = textStyles[variant];

    return (
      <Box
        as="span"
        ref={ref}
        styles={{
          ...variantStyles,
          ...styles,
        }}
        {...variantProps}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

Text.displayName = 'Text';

export { Text };
