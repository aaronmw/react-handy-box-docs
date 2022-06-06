import { forwardRef, Ref } from 'react';
import { Box } from './Box';
import { BoxProps } from './Box.types';

const textStyles = {
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

// eslint-disable-next-line react/display-name
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
