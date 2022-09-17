import {
  nestedSelectorPropAliases,
  stylesToStyleObject,
} from '@/react-handy-box/components/Box';
import { StyleProps } from '@/react-handy-box/components/Box.types';
import { borderRadii } from '@/tokens/borderRadii';
import { borderStyles } from '@/tokens/borderStyles';
import { breakpoints } from '@/tokens/breakpoints';
import { colorCodesBySwatchName, themes } from '@/tokens/colorPalette';
import { transitionDurations } from '@/tokens/transitionDurations';
import { zIndices } from '@/tokens/zIndices';
import { CSSObject } from 'styled-components';

type TestDescriptor = [
  description: string,
  tests: Array<[it: string, given: StyleProps, expect: CSSObject]>
];

const theme = themes.light;

const tests: Array<TestDescriptor> = [
  [
    'Box Tests',
    [
      [
        'resolves swatch name',
        {
          backgroundColor: 'black',
        },
        {
          backgroundColor: colorCodesBySwatchName.black,
        },
      ],
      [
        'adjusts lightness value of semantic swatch',
        {
          color: 'shaded',
          colorLightness: 200,
        },
        {
          color: colorCodesBySwatchName['purple--200--40'],
        },
      ],
      [
        'adjusts alpha value of semantic swatch',
        {
          color: 'shaded',
          colorOpacity: 100,
        },
        {
          color: colorCodesBySwatchName['purple--100'],
        },
      ],
      [
        'adjusts lightness value of default text color',
        {
          colorLightness: 200,
        },
        {
          color: colorCodesBySwatchName['blue--200'],
        },
      ],
      [
        'adjusts a swatch to absolute lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: 200,
        },
        {
          backgroundColor: colorCodesBySwatchName['orange--200'],
        },
      ],
      [
        'adjusts a swatch to relative lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '+200',
        },
        {
          backgroundColor: colorCodesBySwatchName['orange--700'],
        },
      ],
      [
        'adjusts a swatch to safest relative lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '+700',
        },
        {
          backgroundColor: colorCodesBySwatchName['orange--700'],
        },
      ],
      [
        'adjusts a swatch to relative alpha value',
        {
          backgroundColor: 'orange--500',
          backgroundColorOpacity: '-10',
        },
        {
          backgroundColor: colorCodesBySwatchName['orange--500--90'],
        },
      ],
      [
        'adjusts a swatch to absolute alpha value',
        {
          backgroundColor: 'orange--500',
          backgroundColorOpacity: 50,
        },
        {
          backgroundColor: colorCodesBySwatchName['orange--500--50'],
        },
      ],
      [
        'adjusts a swatch to both relative lightness and alpha',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '-100',
          backgroundColorOpacity: '-10',
        },
        {
          backgroundColor: colorCodesBySwatchName['orange--400--90'],
        },
      ],
      [
        'adjusts a swatch for border edge, no color specified',
        {
          borderLeft: 'normal',
          borderLeftColorLightness: '+200',
        },
        {
          borderLeftColor: colorCodesBySwatchName['gray--400'],
          borderLeftStyle: borderStyles.normal.borderStyle as any,
          borderLeftWidth: borderStyles.normal.borderWidth,
        },
      ],
      [
        'adjusts a swatch for border edge of specific color',
        {
          borderLeft: 'normal',
          borderLeftColor: 'blue',
          borderLeftColorLightness: '+200',
        },
        {
          borderLeftColor: colorCodesBySwatchName['blue--600'],
          borderLeftStyle: borderStyles.normal.borderStyle as any,
          borderLeftWidth: borderStyles.normal.borderWidth,
        },
      ],
      [
        'adjusts a swatch for border edge of non-normal style',
        {
          borderLeft: 'thick',
          borderLeftColor: 'blue',
          borderLeftColorLightness: '+200',
        },
        {
          borderLeftColor: colorCodesBySwatchName['blue--600'],
          borderLeftStyle: borderStyles.thick.borderStyle as any,
          borderLeftWidth: borderStyles.thick.borderWidth,
        },
      ],
      [
        'sets individual borders',
        {
          borderLeft: 'hairline',
          borderTop: 'dashed',
        },
        {
          borderLeftColor: colorCodesBySwatchName[theme.border],
          borderLeftStyle: borderStyles.hairline.borderStyle as any,
          borderLeftWidth: borderStyles.hairline.borderWidth,
          borderTopColor: colorCodesBySwatchName[theme.border],
          borderTopStyle: borderStyles.dashed.borderStyle as any,
          borderTopWidth: borderStyles.dashed.borderWidth,
        },
      ],
      [
        'sets border radii',
        {
          borderRadius: 'circle',
          borderTopLeftRadius: 'normal',
        },
        {
          borderRadius: borderRadii.circle,
          borderTopLeftRadius: borderRadii.normal,
        },
      ],
      [
        'sets aliased border radii',
        {
          borderTopRadius: 'normal',
        },
        {
          borderTopRightRadius: borderRadii.normal,
          borderTopLeftRadius: borderRadii.normal,
        },
      ],
      [
        'sets "implied" props',
        {
          alignItems: 'center',
        },
        {
          alignItems: 'center',
          display: 'flex',
        },
      ],
      [
        'sets padding shorthand',
        {
          padding: 'normal',
        },
        {
          padding: 'var(--white-space--normal)',
        },
      ],
      [
        'sets padding when mixing shorthand and edge-specific',
        {
          padding: 'normal',
          paddingTop: 'tight',
        },
        {
          padding: 'var(--white-space--normal)',
          paddingTop: 'var(--white-space--tight)',
        },
      ],
      [
        'sets padding via aliases',
        {
          paddingX: 'normal',
          paddingY: 'tight',
        },
        {
          paddingBottom: 'var(--white-space--tight)',
          paddingLeft: 'var(--white-space--normal)',
          paddingRight: 'var(--white-space--normal)',
          paddingTop: 'var(--white-space--tight)',
        },
      ],
      [
        'resolves stylesOnHover',
        {
          color: 'black',
          stylesOnHover: {
            color: 'white',
          },
        },
        {
          color: colorCodesBySwatchName.black,
          [nestedSelectorPropAliases.stylesOnHover]: {
            color: colorCodesBySwatchName.white,
          },
        },
      ],
      [
        'resolves stylesForAfterElement',
        {
          color: 'white',
          stylesForAfterElement: {
            backgroundColor: 'black',
            display: 'block',
          },
        },
        {
          color: colorCodesBySwatchName.white,
          [nestedSelectorPropAliases.stylesForAfterElement]: {
            backgroundColor: colorCodesBySwatchName.black,
            content: '""',
            display: 'block',
          },
        },
      ],
      [
        'resolves stylesForBeforeElement',
        {
          color: 'black',
          stylesForBeforeElement: {
            backgroundColor: 'white',
            display: 'block',
          },
        },
        {
          color: colorCodesBySwatchName.black,
          [nestedSelectorPropAliases.stylesForBeforeElement]: {
            backgroundColor: colorCodesBySwatchName.white,
            content: '""',
            display: 'block',
          },
        },
      ],
      [
        'resolves stylesForFirstElement',
        {
          color: 'black',
          stylesForFirstElement: {
            color: 'white',
          },
        },
        {
          color: colorCodesBySwatchName.black,
          [nestedSelectorPropAliases.stylesForFirstElement]: {
            color: colorCodesBySwatchName.white,
          },
        },
      ],
      [
        'resolves stylesForCustomSelector',
        {
          color: 'black',
          stylesForCustomSelector: {
            '&:hover': { color: 'white' },
          },
        },
        {
          'color': colorCodesBySwatchName.black,
          '&:hover': {
            color: colorCodesBySwatchName.white,
          },
        },
      ],
      [
        'resolves responsive props (stylesFor{breakpointName})',
        {
          color: 'black',
          stylesForTabletOrLarger: {
            color: 'white',
          },
          stylesForPhoneOnly: {
            color: 'white',
          },
        },
        {
          color: colorCodesBySwatchName.black,
          [breakpoints.tabletOrLarger]: {
            color: colorCodesBySwatchName.white,
          },
          [breakpoints.phoneOnly]: {
            color: colorCodesBySwatchName.white,
          },
        },
      ],
      [
        'resolves transitionDuration and sets other transition props',
        {
          transitionDuration: 'short',
        },
        {
          transitionDuration: transitionDurations.short,
          transitionProperty: 'all',
          transitionTimingFunction: 'ease',
        },
      ],
      [
        'resolves transitionDuration and sets unspecified transition props',
        {
          transitionDuration: 'short',
          transitionTimingFunction: 'ease-in-out',
        },
        {
          transitionDuration: transitionDurations.short,
          transitionProperty: 'all',
          transitionTimingFunction: 'ease-in-out',
        },
      ],
      [
        'resolves transitionProperty list',
        {
          transitionProperty: ['color', 'opacity'],
        },
        {
          transitionDuration: transitionDurations.normal,
          transitionProperty: 'color, opacity',
          transitionTimingFunction: 'ease',
        },
      ],
      [
        'resolves zIndex and sets pos: relative',
        {
          zIndex: '1--stickyElements',
        },
        {
          position: 'relative',
          zIndex: zIndices['1--stickyElements'],
        },
      ],
    ],
  ],
];

tests.forEach(([testDescription, tests]) => {
  describe(testDescription, () => {
    tests.forEach(([testName, styles, expectedCSSObject]) => {
      it(testName, () => {
        const result = stylesToStyleObject({
          styles,
          theme: theme,
        });

        expect(result).toStrictEqual(expectedCSSObject);
      });
    });
  });
});
