import { colorPalette } from '@/tokens/colorPalette';
import { fontNames, fontSizes, lineHeights } from '@/tokens/typography';
import { whiteSpaceNames } from '@/tokens/whiteSpaces';

export const globalStyles = {
  phoneOnly: {
    cssVariables: {
      fontSize: {
        xxlarge: '2rem',
      },
      lineHeight: {
        xxlarge: '2.2rem',
      },
    },
  },
  root: {
    styles: {
      color: colorPalette.text,
      fontFamily: fontNames.body.fontFamily,
      fontSize: fontSizes.normal,
      fontWeight: fontNames.body.fontWeight,
      lineHeight: lineHeights.normal,
      scrollPaddingTop: '10vh',
    },
    cssVariables: {
      fontSize: {
        ...fontSizes,
      },
      lineHeight: {
        ...lineHeights,
      },
      whiteSpace: {
        ...whiteSpaceNames,
      },
    },
  },
};
