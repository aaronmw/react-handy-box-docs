import { colorPalette } from './colorPalette';
import { fontNames, fontSizes, lineHeights } from './typography';
import { whiteSpaceNames } from './whiteSpaces';

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
