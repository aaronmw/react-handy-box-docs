import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { forwardRef, Ref } from 'react';

const textStyles = {
  'code': {
    color: 'purple',
    fontFamily: 'monospace',
  },
  'heading--1': {
    as: 'h1',
    fontSize: 'xxlarge',
    fontWeight: 900,
  },
  'heading--2': {
    as: 'h2',
    fontSize: 'xlarge',
    fontWeight: 'bold',
  },
  'heading--3': {
    as: 'h3',
    fontSize: 'large',
    fontWeight: 'bold',
  },
  'label': {
    color: 'purple--200',
  },
  'normal': {},
};

type TextProps<TagName extends keyof JSX.IntrinsicElements> =
  BoxProps<TagName> & {
    variant?: keyof typeof textStyles;
  };

const Text = forwardRef(
  <TagName extends keyof JSX.IntrinsicElements = 'span'>(
    { children, variant = 'normal', ...props }: TextProps<TagName>,
    ref: Ref<HTMLElement>
  ) => (
    <Box
      as="span"
      ref={ref}
      {...(textStyles[variant] as BoxProps<TagName>)}
      {...props}
    >
      {children}
    </Box>
  )
);

export { Text };
