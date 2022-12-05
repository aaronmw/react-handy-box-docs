import { TokensByBreakpoint } from '@/react-handy-box/components/Box.types';

export const fontNames = {
  body: {
    fontFamily: `Inter, sans-serif`,
    fontWeight: 400,
  },
};

export const fontSizeNames = [
  'xxlarge',
  'xlarge',
  'large',
  'normal',
  'small',
  'xsmall',
] as const;

export const fontSizesAndLineHeights: TokensByBreakpoint<
  [string, string],
  typeof fontSizeNames[number]
> = {
  root: {
    xxlarge: ['3.75rem', '3.75rem'],
    xlarge: ['2.5rem', '2.5rem'],
    large: ['1.5rem', '1.5rem'],
    normal: ['16px', '1.4rem'],
    small: ['0.833rem', '1.2rem'],
    xsmall: ['0.588rem', '1rem'],
  },
};

export const textStyles = {
  'code': {
    as: 'code',
    styles: { color: 'purple', fontFamily: 'monospace' },
  },
  'heading--1': {
    as: 'h1',
    styles: { fontSize: 'xxlarge', fontWeight: 900 },
  },
  'heading--2': {
    as: 'h2',
    styles: { fontSize: 'xlarge', fontWeight: 'bold' },
  },
  'heading--3': {
    as: 'h3',
    styles: { fontSize: 'large', fontWeight: 'bold' },
  },
  'label': {
    styles: { color: 'textFaded', fontSize: 'small' },
  },
  'normal': {
    styles: {},
  },
} as const;
