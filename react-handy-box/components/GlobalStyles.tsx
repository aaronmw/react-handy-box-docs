import { ThemeObject } from '@/react-handy-box/components/Box.types';
import { animationNames } from '@/tokens/animationNames';
import { borderRadii } from '@/tokens/borderRadii';
import { colorCodesBySwatchName } from '@/tokens/colorPalette';
import { fontSizes, lineHeights } from '@/tokens/typography';
import { whiteSpaceNames } from '@/tokens/whiteSpaces';
import { createGlobalStyle } from 'styled-components';
import { stylesToStyleObject } from './Box';

const toCSSVariables = (
  variableName: string,
  variableMap: Record<string, string>
) =>
  Object.fromEntries(
    Object.entries(variableMap).map(([keyName, value]) => [
      `--${variableName}--${keyName}`,
      value,
    ])
  );

const GlobalStyles = createGlobalStyle<{
  theme: ThemeObject;
}>(({ theme }) => ({
  '*': {
    backgroundColor: 'transparent',
    border: 'none',
    boxSizing: 'border-box',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    listStyleType: 'none',
    margin: 0,
    outline: 'none',
    padding: 0,
    textAlign: 'inherit',
    textDecoration: 'none',
  },
  '::placeholder': stylesToStyleObject({
    styles: {
      color: 'textFaded',
    },
    theme,
  }),
  '::-webkit-scrollbar': {
    height: 10,
    width: 10,
  },
  '::-webkit-scrollbar-corner': stylesToStyleObject({
    styles: {
      backgroundColor: 'shaded',
    },
    theme,
  }),
  '::-webkit-scrollbar-thumb': stylesToStyleObject({
    styles: {
      backgroundColor: 'primary',
      border: 'hairline',
      borderColor: 'background',
      borderRadius: 'circle',
    },
    theme,
  }),
  '::-webkit-scrollbar-track': stylesToStyleObject({
    styles: { backgroundColor: 'shaded' },
    theme,
  }),
  ':root': {
    ...toCSSVariables('border-radius', borderRadii),
    ...toCSSVariables('font-size', fontSizes),
    ...toCSSVariables('line-height', lineHeights),
    ...toCSSVariables('white-space', whiteSpaceNames),
    ...stylesToStyleObject({
      styles: {
        backgroundColor: 'background',
        color: 'text',
        fontName: 'body',
        fontSize: 'normal',
        scrollPaddingTop: '10vh',
        scrollbarColor: `${colorCodesBySwatchName[theme.primary]} ${
          colorCodesBySwatchName[theme.shaded]
        }`,
      },
      theme,
    }),
  },
}));

export { GlobalStyles };
