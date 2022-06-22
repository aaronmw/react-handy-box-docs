import {
  nestedSelectorPropAliases,
  propsToStyleObject,
} from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { borderRadii } from '@/tokens/borderRadii';
import { borderStyles } from '@/tokens/borderStyles';
import { breakpoints } from '@/tokens/breakpoints';
import { colorPalette } from '@/tokens/colorPalette';
import { transitionDurations } from '@/tokens/transitionDurations';
import { zIndices } from '@/tokens/zIndices';
import { CSSObject } from 'styled-components';

type TestDescriptor = [
  description: string,
  tests: Array<[it: string, given: BoxProps<'div'>, expect: CSSObject]>
];

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
          backgroundColor: colorPalette.black,
        },
      ],
      [
        'adjusts lightness value of default text color',
        {
          colorLightness: 200,
        },
        {
          color: colorPalette['blue--200'],
        },
      ],
      [
        'adjusts a swatch to absolute lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: 200,
        },
        {
          backgroundColor: colorPalette['orange--200'],
        },
      ],
      [
        'adjusts a swatch to relative lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '+200',
        },
        {
          backgroundColor: colorPalette['orange--700'],
        },
      ],
      [
        'adjusts a swatch to safest relative lightness value',
        {
          backgroundColor: 'orange--500',
          backgroundColorLightness: '+700',
        },
        {
          backgroundColor: colorPalette['orange--700'],
        },
      ],
      [
        'adjusts a swatch for border edge, no color specified',
        {
          borderLeft: 'normal',
          borderLeftColorLightness: '+200',
        },
        {
          borderLeftColor: colorPalette['gray--400'],
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
          borderLeftColor: colorPalette['blue--600'],
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
          borderLeftColor: colorPalette['blue--600'],
          borderLeftStyle: borderStyles.thick.borderStyle as any,
          borderLeftWidth: borderStyles.thick.borderWidth,
        },
      ],
      [
        'adjusts a swatch for border edges alias, no color specified',
        {
          borderY: 'normal',
          borderYColorLightness: '+200',
        },
        {
          borderBottomColor: colorPalette['gray--400'],
          borderBottomStyle: borderStyles.normal.borderStyle as any,
          borderBottomWidth: borderStyles.normal.borderWidth,
          borderTopColor: colorPalette['gray--400'],
          borderTopStyle: borderStyles.normal.borderStyle as any,
          borderTopWidth: borderStyles.normal.borderWidth,
        },
      ],
      [
        'sets individual borders',
        {
          borderLeft: 'hairline',
          borderTop: 'dashed',
        },
        {
          borderLeftColor: colorPalette.border,
          borderLeftStyle: borderStyles.hairline.borderStyle as any,
          borderLeftWidth: borderStyles.hairline.borderWidth,
          borderTopColor: colorPalette.border,
          borderTopStyle: borderStyles.dashed.borderStyle as any,
          borderTopWidth: borderStyles.dashed.borderWidth,
        },
      ],
      [
        'sets aliased border props',
        {
          borderX: 'hairline',
          borderYColor: 'black',
        },
        {
          borderBottomColor: colorPalette.black,
          borderBottomStyle: borderStyles.normal.borderStyle as any,
          borderBottomWidth: borderStyles.normal.borderWidth,
          borderLeftColor: colorPalette.border,
          borderLeftStyle: borderStyles.hairline.borderStyle as any,
          borderLeftWidth: borderStyles.hairline.borderWidth,
          borderRightColor: colorPalette.border,
          borderRightStyle: borderStyles.hairline.borderStyle as any,
          borderRightWidth: borderStyles.hairline.borderWidth,
          borderTopColor: colorPalette.black,
          borderTopStyle: borderStyles.normal.borderStyle as any,
          borderTopWidth: borderStyles.normal.borderWidth,
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
          padding: 'var(--whiteSpace--normal)',
        },
      ],
      [
        'sets padding when mixing shorthand and edge-specific',
        {
          padding: 'normal',
          paddingTop: 'tight',
        },
        {
          padding: 'var(--whiteSpace--normal)',
          paddingTop: 'var(--whiteSpace--tight)',
        },
      ],
      [
        'sets padding via aliases',
        {
          paddingX: 'normal',
          paddingY: 'tight',
        },
        {
          paddingBottom: 'var(--whiteSpace--tight)',
          paddingLeft: 'var(--whiteSpace--normal)',
          paddingRight: 'var(--whiteSpace--normal)',
          paddingTop: 'var(--whiteSpace--tight)',
        },
      ],
      [
        'resolves propsOnHover',
        {
          color: 'black',
          propsOnHover: {
            color: 'white',
          },
        },
        {
          color: colorPalette.black,
          [nestedSelectorPropAliases.propsOnHover]: {
            color: colorPalette.white,
          },
        },
      ],
      [
        'resolves propsForAfterElement',
        {
          color: 'white',
          propsForAfterElement: {
            backgroundColor: 'black',
            display: 'block',
          },
        },
        {
          color: colorPalette.white,
          [nestedSelectorPropAliases.propsForAfterElement]: {
            backgroundColor: colorPalette.black,
            content: '""',
            display: 'block',
          },
        },
      ],
      [
        'resolves propsForBeforeElement',
        {
          color: 'black',
          propsForBeforeElement: {
            backgroundColor: 'white',
            display: 'block',
          },
        },
        {
          color: colorPalette.black,
          [nestedSelectorPropAliases.propsForBeforeElement]: {
            backgroundColor: colorPalette.white,
            content: '""',
            display: 'block',
          },
        },
      ],
      [
        'resolves propsForFirstElement',
        {
          color: 'black',
          propsForFirstElement: {
            color: 'white',
          },
        },
        {
          color: colorPalette.black,
          [nestedSelectorPropAliases.propsForFirstElement]: {
            color: colorPalette.white,
          },
        },
      ],
      [
        'resolves responsive props (propsFor{breakpointName})',
        {
          color: 'black',
          propsForTabletOrLarger: {
            color: 'white',
          },
          propsForPhoneOnly: {
            color: 'white',
          },
        },
        {
          color: colorPalette.black,
          [breakpoints.tabletOrLarger]: {
            color: colorPalette.white,
          },
          [breakpoints.phoneOnly]: {
            color: colorPalette.white,
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
          zIndex: '1',
        },
        {
          position: 'relative',
          zIndex: zIndices['1'],
        },
      ],
    ],
  ],
];

tests.forEach(([testDescription, tests]) => {
  describe(testDescription, () => {
    tests.forEach(([testName, boxProps, expectedCSSObject]) => {
      it(testName, () => {
        const result = propsToStyleObject(boxProps);

        expect(result).toStrictEqual(expectedCSSObject);
      });
    });
  });
});
