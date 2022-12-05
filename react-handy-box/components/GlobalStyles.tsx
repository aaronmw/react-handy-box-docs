import { stylesToStyleObject } from '@/react-handy-box/components/Box';
import { ThemeObject } from '@/react-handy-box/components/Box.types';
import { mapKeysToCSSVariables } from '@/react-handy-box/utilities/mapKeysToCSSVariables';
import { animationNames } from '@/tokens/animationNames';
import { borderRadii } from '@/tokens/borderRadii';
import { breakpointNames, breakpoints } from '@/tokens/breakpoints';
import { colorCodesBySwatchName } from '@/tokens/colorPalette';
import { globalStyles } from '@/tokens/globalStyles';
import { scrollbarStyles } from '@/tokens/scrollbarStyles';
import { fontSizesAndLineHeights } from '@/tokens/typography';
import { whiteSpaceByBreakpoint } from '@/tokens/whiteSpaces';
import mapValues from 'lodash/mapValues';
import merge from 'lodash/merge';
import { createGlobalStyle } from 'styled-components';

const GlobalAnimations = createGlobalStyle`
    ${Object.entries(animationNames).map(
      ([animationName, animationDescriptor]) => `
        @keyframes ${animationName} {
          ${animationDescriptor.keyframes}
        }
      `
    )}
`;

const fontSizesByBreakpoint = mapValues(fontSizesAndLineHeights, (value, key) =>
  mapValues(value, (tuple) => tuple[0])
);

const lineHeightsByBreakpoint = mapValues(
  fontSizesAndLineHeights,
  (value, key) => mapValues(value, (tuple) => tuple[1])
);

const GlobalStyles = createGlobalStyle<{
  theme: ThemeObject;
}>(({ theme }) =>
  merge(
    {
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
          fontStyle: 'italic',
        },
        theme,
      }),
      '::-webkit-scrollbar': stylesToStyleObject({
        styles: scrollbarStyles.scrollbar,
        theme,
      }),
      '::-webkit-scrollbar-corner': stylesToStyleObject({
        styles: scrollbarStyles.corner,
        theme,
      }),
      '::-webkit-scrollbar-thumb': stylesToStyleObject({
        styles: scrollbarStyles.thumb,
        theme,
      }),
      '::-webkit-scrollbar-track': stylesToStyleObject({
        styles: scrollbarStyles.track,
        theme,
      }),
      ':root': stylesToStyleObject({
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
      ...Object.fromEntries(
        breakpointNames
          .map((breakpointName) => {
            return [
              breakpoints[breakpointName],
              {
                ':root': {
                  ...mapKeysToCSSVariables(
                    borderRadii[breakpointName] ?? {},
                    'border-radius'
                  ),
                  ...mapKeysToCSSVariables(
                    fontSizesByBreakpoint[breakpointName] ?? {},
                    'font-size'
                  ),
                  ...mapKeysToCSSVariables(
                    lineHeightsByBreakpoint[breakpointName] ?? {},
                    'line-height'
                  ),
                  ...mapKeysToCSSVariables(
                    whiteSpaceByBreakpoint[breakpointName] ?? {},
                    'white-space'
                  ),
                },
              },
            ];
          })
          .reverse()
      ),
    } as const,
    globalStyles
  )
);

export { GlobalAnimations, GlobalStyles };
