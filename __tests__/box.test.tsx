import { render, screen } from '@testing-library/react';
import { CSSObject } from 'styled-components';
import {
  nestedSelectorPropAliases,
  propsToStyleObject,
} from '../components/Box';
import { BoxProps } from '../components/Box.types';
import {
  breakpoints,
  colorPalette,
  transitionDurations,
  zIndices,
} from '../tokens';

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
            content: '',
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
            content: '',
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
          propsForDesktopOrLarger: {
            color: 'white',
          },
          propsForPhoneOnly: {
            color: 'white',
          },
        },
        {
          color: colorPalette.black,
          [breakpoints.desktopOrLarger]: {
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
