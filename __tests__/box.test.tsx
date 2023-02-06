import { colorPalette } from '@/react-handy-box/colors';
import {
  nestedSelectorPropAliases,
  stylesToStyleObject,
} from '@/react-handy-box/components/Box';
import { StyleProps } from '@/react-handy-box/components/Box.types';
import { BorderRadiusName } from '@/react-handy-box/types';
import { tokens } from '@/tokens';
import { CSSObject } from 'styled-components';

type TestDescriptor = [
  description: string,
  tests: Array<[it: string, given: StyleProps, expect: CSSObject]>
];

const colorThemeName = 'light';

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
          backgroundColor: 'var(--color--black)',
        },
      ],
      [
        'adjusts lightness value of semantic swatch',
        {
          color: 'shaded',
          colorLightness: 200,
        },
        {
          color: 'var(--color--purple--200--40)',
        },
      ],
      [
        'adjusts alpha value of semantic swatch',
        {
          color: 'shaded',
          colorOpacity: 100,
        },
        {
          color: 'var(--color--purple--100--100)',
        },
      ],
      [
        'adjusts lightness value of default text color',
        {
          colorLightness: 200,
        },
        {
          color: 'var(--color--blue--200--100)',
        },
      ],
      [
        'adjusts a swatch to absolute lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: 200,
        },
        {
          backgroundColor: 'var(--color--orange--200--100)',
        },
      ],
      [
        'adjusts a swatch to relative lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '+200',
        },
        {
          backgroundColor: 'var(--color--orange--700--100)',
        },
      ],
      [
        'adjusts a swatch to safest relative lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '+700',
        },
        {
          backgroundColor: 'var(--color--orange--700--100)',
        },
      ],
      [
        'adjusts a swatch to relative alpha value',
        {
          backgroundColor: 'orange--500',
          backgroundColorOpacity: '-10',
        },
        {
          backgroundColor: 'var(--color--orange--500--90)',
        },
      ],
      [
        'adjusts a swatch to absolute alpha value',
        {
          backgroundColor: 'orange--500',
          backgroundColorOpacity: 50,
        },
        {
          backgroundColor: 'var(--color--orange--500--50)',
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
          backgroundColor: 'var(--color--orange--400--90)',
        },
      ],
      [
        'adjusts a swatch for border edge, no color specified',
        {
          borderLeft: 'normal',
          borderLeftColorLightness: '+200',
        },
        {
          borderLeftColor: 'var(--color--gray--400--100)',
          borderLeftStyle: tokens.borderStyles.normal.borderStyle as any,
          borderLeftWidth: tokens.borderStyles.normal.borderWidth,
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
          borderLeftColor: 'var(--color--blue--600--100)',
          borderLeftStyle: tokens.borderStyles.normal.borderStyle as any,
          borderLeftWidth: tokens.borderStyles.normal.borderWidth,
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
          borderLeftColor: 'var(--color--blue--600--100)',
          borderLeftStyle: tokens.borderStyles.thick.borderStyle as any,
          borderLeftWidth: tokens.borderStyles.thick.borderWidth,
        },
      ],
      [
        'sets individual borders',
        {
          borderLeft: 'hairline',
          borderTop: 'dashed',
        },
        {
          borderLeftColor: 'var(--color--gray--200--100)',
          borderLeftStyle: tokens.borderStyles.hairline.borderStyle as any,
          borderLeftWidth: tokens.borderStyles.hairline.borderWidth,
          borderTopColor: 'var(--color--gray--200--100)',
          borderTopStyle: tokens.borderStyles.dashed.borderStyle as any,
          borderTopWidth: tokens.borderStyles.dashed.borderWidth,
        },
      ],
      [
        'sets border radii',
        {
          borderRadius: 'circle',
          borderTopLeftRadius: 'normal',
        },
        {
          borderRadius: 'var(--border-radius--circle)',
          borderTopLeftRadius: 'var(--border-radius--normal)',
        },
      ],
      [
        'sets aliased border radii',
        {
          borderTopRadius: 'normal',
        },
        {
          borderTopRightRadius: 'var(--border-radius--normal)',
          borderTopLeftRadius: 'var(--border-radius--normal)',
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
          color: 'var(--color--black)',
          [nestedSelectorPropAliases.stylesOnHover]: {
            color: 'var(--color--white)',
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
          color: 'var(--color--white)',
          [nestedSelectorPropAliases.stylesForAfterElement]: {
            backgroundColor: 'var(--color--black)',
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
          color: 'var(--color--black)',
          [nestedSelectorPropAliases.stylesForBeforeElement]: {
            backgroundColor: 'var(--color--white)',
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
          color: 'var(--color--black)',
          [nestedSelectorPropAliases.stylesForFirstElement]: {
            color: 'var(--color--white)',
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
          'color': 'var(--color--black)',
          '&:hover': {
            color: 'var(--color--white)',
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
          color: 'var(--color--black)',
          [tokens.breakpoints.tabletOrLarger]: {
            color: 'var(--color--white)',
          },
          [tokens.breakpoints.phoneOnly]: {
            color: 'var(--color--white)',
          },
        },
      ],
      [
        'resolves transitionDuration and sets other transition props',
        {
          transitionDuration: 'short',
        },
        {
          transitionDuration: tokens.animationDurations.short,
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
          transitionDuration: tokens.animationDurations.short,
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
          transitionDuration: tokens.animationDurations.normal,
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
          zIndex: tokens.zIndices['1--stickyElements'],
        },
      ],
    ],
  ],
];

tests.forEach(([testDescription, tests]) => {
  describe(testDescription, () => {
    tests.forEach(([testName, styleProps, expectedCSSObject]) => {
      it(testName, () => {
        const result = stylesToStyleObject({
          styleProps,
          colorThemeName,
        });

        expect(result).toStrictEqual(expectedCSSObject);
      });
    });
  });
});
