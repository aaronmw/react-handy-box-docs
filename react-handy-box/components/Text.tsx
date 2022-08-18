import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { textStyles } from '@/tokens/typography';
import { forwardRef, Ref } from 'react';

type TextProps<TagName extends keyof JSX.IntrinsicElements> = Omit<
  BoxProps<TagName>,
  'ref' | 'style'
> & {
  size?: BoxProps<TagName>['fontSize'];
  style?: BoxProps<TagName>['fontStyle'];
  variant?: keyof typeof textStyles;
  weight?: BoxProps<TagName>['fontWeight'];
};

const Text = forwardRef(
  <TagName extends keyof JSX.IntrinsicElements = 'span'>(
    {
      children,
      size,
      style,
      variant = 'normal',
      weight,
      ...props
    }: TextProps<TagName>,
    ref: Ref<HTMLElement>
  ) => (
    <Box
      as="span"
      fontSize={size}
      fontWeight={weight}
      fontStyle={style}
      ref={ref}
      {...(textStyles[variant] as any)}
      {...props}
    >
      {children}
    </Box>
  )
);

Text.displayName = 'Text';

export { Text };
