import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  HTMLElementFor,
  StyleProps,
  SupportedTags,
} from '@/react-handy-box/components/Box.types';
import { textStyles } from '@/tokens/typography';
import { Children, forwardRef, Ref } from 'react';

type TextProps<E extends SupportedTags = 'span'> = Omit<
  BoxPropsWithoutRef<E>,
  'size' | 'style' | 'weight'
> & {
  preventWidows?: boolean;
  size?: StyleProps['fontSize'];
  style?: StyleProps['fontStyle'];
  variant?: keyof typeof textStyles;
  weight?: StyleProps['fontWeight'];
};

const Text = forwardRef(
  <E extends SupportedTags = 'span'>(
    {
      as = 'span',
      children,
      preventWidows = false,
      size,
      style,
      styles,
      variant = 'normal',
      weight,
      ...otherProps
    }: TextProps<E>,
    ref: Ref<HTMLElementFor<E>>
  ) => {
    const { styles: variantStyles, ...variantProps } = textStyles[variant];

    return (
      <Box
        as={as}
        dangerouslySetInnerHTML={
          preventWidows
            ? {
                __html: Children.map(children, (child) => child),
              }
            : undefined
        }
        ref={ref}
        styles={{
          ...variantStyles,
          ...(size ? { fontSize: size } : {}),
          ...(style ? { fontStyle: style } : {}),
          ...(weight ? { fontWeight: weight } : {}),
          ...styles,
        }}
        {...variantProps}
        {...otherProps}
      >
        {!preventWidows && children}
      </Box>
    );
  }
);

Text.displayName = 'Text';

export { Text };
