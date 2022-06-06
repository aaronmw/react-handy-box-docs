import camelCase from 'lodash/camelCase';
import clamp from 'lodash/clamp';
import upperFirst from 'lodash/upperFirst';
import styled, { CSSObject } from 'styled-components';
import {
  animationNames,
  borderRadii,
  borderStyles,
  boxShadows,
  breakpoints,
  colorPalette,
  fontNames,
  transitionDurations,
  whiteSpacesAsCSSVariables,
  zIndices,
} from '../tokens';
import { BoxProps, Breakpoint, Color, validStyleProps } from './Box.types';

type PropOptionResolver<TagName extends keyof JSX.IntrinsicElements> = <
  P extends string & keyof BoxProps<TagName>
>(args: {
  propName: P;
  props: BoxProps<TagName>;
  propValue: BoxProps<TagName>[P];
}) => CSSObject;

type PropHandler<TagName extends keyof JSX.IntrinsicElements> = {
  aliases?: Array<keyof BoxProps<TagName>>;
  setDefaults?: CSSObject;
  options:
    | Record<string, string | number | CSSObject>
    | PropOptionResolver<TagName>;
};

type PropHandlers<TagName extends keyof JSX.IntrinsicElements> = {
  [K in keyof BoxProps<TagName>]: PropHandler<TagName>;
};

const nestedSelectorPropAliases = {
  propsForAfterElement: '&::after',
  propsForBeforeElement: '&::before',
  propsForFirstElement: '&:first-child',
  propsOnFocus: '&:focus, &:focus-within',
  propsOnHover: '&:hover, &:focus, &:focus-within',
  propsForLastElement: '&:last-child',
};

const propHandlers: PropHandlers<any> = {
  alignItems: {
    aliases: ['justifyContent'],
    setDefaults: {
      display: 'flex',
    },
    options: ({ propName = 'alignItems', propValue }) => ({
      [propName]: propValue,
    }),
  },
  animationDuration: {
    options: transitionDurations,
  },
  animationName: {
    options: ({ propValue }) => animationNames[propValue].cssObject,
  },
  borderRadius: {
    aliases: [
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
      'borderTopLeftRadius',
      'borderTopRightRadius',
    ],
    options: borderRadii,
  },
  border: {
    aliases: [
      'borderTop',
      'borderRight',
      'borderBottom',
      'borderLeft',
      'borderColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
    ],
    options: ({ props, propName = 'border' }) => {
      const borderEdgeName = propName.replace('Color', '') as
        | 'border'
        | 'borderTop'
        | 'borderRight'
        | 'borderBottom'
        | 'borderLeft';
      const borderStylesObject = borderStyles(props);
      const borderStyle = props[borderEdgeName] ?? 'normal';
      const borderColor = (props[`${borderEdgeName}Color`] ??
        'border') as Color;

      return {
        [`${borderEdgeName}Color`]: colorPalette[borderColor],
        [`${borderEdgeName}Style`]: borderStylesObject[borderStyle].borderStyle,
        [`${borderEdgeName}Width`]: borderStylesObject[borderStyle].borderWidth,
      };
    },
  },
  bottom: {
    aliases: ['left', 'right', 'top'],
    options: whiteSpacesAsCSSVariables,
  },
  boxShadow: {
    options: boxShadows,
  },
  color: {
    aliases: ['backgroundColor'],
    options: colorPalette,
  },
  colorLightness: {
    aliases: ['backgroundColorLightness', 'borderColorLightness'],
    options: ({ props, propName, propValue }) => {
      const colorPropName = propName.replace('Lightness', '');
      const colorPropValue = props[colorPropName];
      const [colorName, lightnessValue = 400] = colorPropValue.split('--');

      const newLightnessValue = ['+', '-'].includes(propValue[0])
        ? clamp(Number(lightnessValue) + Number(propValue), 100, 700)
        : propValue;

      return propsToStyleObject({
        [colorPropName]: `${colorName}--${newLightnessValue}`,
      });
    },
  },
  columnGap: {
    setDefaults: {
      display: 'flex',
      flexDirection: 'row',
    },
    options: whiteSpacesAsCSSVariables,
  },
  columns: {
    aliases: ['rows'],
    setDefaults: {
      gridAutoRows: '1fr',
    },
    options: ({ propName = 'columns', propValue }) => {
      let result;

      if (typeof propValue === 'number') {
        result = Array(propValue).fill('1fr').join(' ');
      } else if (Array.isArray(propValue)) {
        result = propValue.join(' ');
      } else {
        result = propValue;
      }

      return {
        display: 'grid',
        [`gridTemplate${upperFirst(propName)}`]: result,
      };
    },
  },
  flexDirection: {
    setDefaults: {
      display: 'flex',
    },
    options: ({ propValue }) => ({
      flexDirection: propValue,
    }),
  },
  flexWrap: {
    setDefaults: {
      display: 'flex',
    },
    options: ({ propValue }) => ({
      flexWrap: propValue,
    }),
  },
  fontName: {
    options: fontNames,
  },
  fontSize: {
    options: ({ props: { fontSize, lineHeight } }) => ({
      fontSize: `var(--fontSize--${fontSize})`,
      lineHeight: lineHeight ?? `var(--lineHeight--${fontSize})`,
    }),
  },
  gap: {
    setDefaults: {
      display: 'grid',
    },
    options: whiteSpacesAsCSSVariables,
  },
  isOnlyForScreenReaders: {
    options: () => ({
      clip: 'rect(0,0,0,0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    }),
  },
  padding: {
    aliases: [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'margin',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
    ],
    options: whiteSpacesAsCSSVariables,
  },
  paddingX: {
    aliases: ['paddingY', 'marginX', 'marginY'],
    options: ({ propName, propValue }) => {
      const axis = propName.slice(-1);
      const propNameMinusAxis = propName.slice(0, -1);
      const A = axis === 'X' ? 'Left' : 'Bottom';
      const B = axis === 'X' ? 'Right' : 'Top';

      return propsToStyleObject({
        [`${propNameMinusAxis}${A}`]: propValue,
        [`${propNameMinusAxis}${B}`]: propValue,
      });
    },
  },
  propsForAfterElement: {
    aliases: ['propsForBeforeElement'],
    options: ({ propName, propValue }) => ({
      [nestedSelectorPropAliases[
        propName as keyof typeof nestedSelectorPropAliases
      ]]: {
        content: '',
        ...propsToStyleObject(propValue),
      },
    }),
  },
  propsForRoot: {
    aliases: Object.keys(breakpoints).map(
      (breakpointName) => `propsFor${upperFirst(breakpointName)}`
    ),
    options: ({ propName, propValue }) => {
      const breakpointName = camelCase(
        propName.replace('propsFor', '')
      ) as Breakpoint;

      const mediaQuery = breakpoints[breakpointName];

      return {
        [mediaQuery]: propsToStyleObject(propValue),
      };
    },
  },
  propsOnFocus: {
    options: ({ propValue }) => ({
      '&:focus, &:focus-within': propsToStyleObject(propValue),
    }),
  },
  propsOnHover: {
    aliases: ['propsOnFocus', 'propsForFirstElement', 'propsForLastElement'],
    options: ({ propName, propValue }) => {
      const propSelector =
        nestedSelectorPropAliases[
          propName as keyof typeof nestedSelectorPropAliases
        ];

      return {
        [propSelector!]: propsToStyleObject(propValue),
      };
    },
  },
  rowGap: {
    setDefaults: {
      display: 'flex',
      flexDirection: 'column',
    },
    options: whiteSpacesAsCSSVariables,
  },
  transitionDuration: {
    aliases: ['transitionProperty', 'transitionTimingFunction'],
    options: ({
      props: {
        transitionDuration,
        transitionProperty,
        transitionTimingFunction,
      },
    }) => ({
      transitionDuration: transitionDurations[transitionDuration ?? 'normal'],
      transitionProperty: Array.isArray(transitionProperty)
        ? transitionProperty.join(', ')
        : transitionProperty ?? 'all',
      transitionTimingFunction: transitionTimingFunction ?? 'ease',
    }),
  },
  zIndex: {
    setDefaults: {
      position: 'relative',
    },
    options: zIndices,
  },
};

Object.entries(propHandlers).forEach(([propName, propHandler]) => {
  propHandler?.aliases?.forEach((aliasedPropName) => {
    propHandlers[aliasedPropName] = propHandlers[propName];
  });
});

const propsToStyleObject: (boxProps: BoxProps<any>) => CSSObject = (boxProps) =>
  Object.keys(boxProps).reduce((acc, propName) => {
    const propHandler = propHandlers[propName];
    const propValue = boxProps[propName];

    if (typeof propValue === 'undefined') {
      return acc;
    }

    if (!propHandler) {
      if (propName === 'debug') {
        console.log(acc);
      }

      return validStyleProps.includes(propName)
        ? {
            ...acc,
            [propName]: propValue,
          }
        : acc;
    }

    const defaults = propHandler.setDefaults ?? {};

    if (typeof propHandler.options === 'function') {
      return {
        ...defaults,
        ...acc,
        ...propHandler.options({
          props: boxProps,
          propName,
          propValue,
        }),
      };
    } else if (typeof propHandler.options === 'object') {
      return {
        ...defaults,
        ...acc,
        [propName]: propHandler.options[propValue] ?? propValue,
      };
    }

    return acc;
  }, {});

const Box: <TagName extends keyof JSX.IntrinsicElements = 'div'>(
  props: BoxProps<TagName>
) => JSX.Element = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !Object.keys(propHandlers).includes(prop) && defaultValidatorFn(prop),
})`
  ${<TagName extends keyof JSX.IntrinsicElements = 'div'>(
    props: BoxProps<TagName>
  ) => propsToStyleObject(props)}
`;

export { Box, nestedSelectorPropAliases, propsToStyleObject };
