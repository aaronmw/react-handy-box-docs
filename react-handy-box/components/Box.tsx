import {
  BorderStyle,
  BoxProps,
  Breakpoint,
  StyleProps,
  ThemedStyles,
  validStyleProps,
} from '@/react-handy-box/components/Box.types';
import { adjustColor } from '@/react-handy-box/utilities/adjustColorLightness';
import { animationNames } from '@/tokens/animationNames';
import { borderRadii } from '@/tokens/borderRadii';
import { borderStyles } from '@/tokens/borderStyles';
import { boxShadows } from '@/tokens/boxShadows';
import { breakpoints } from '@/tokens/breakpoints';
import { colorPalette } from '@/tokens/colorPalette';
import { transitionDurations } from '@/tokens/transitionDurations';
import { fontNames } from '@/tokens/typography';
import { whiteSpacesAsCSSVariables } from '@/tokens/whiteSpaces';
import { zIndices } from '@/tokens/zIndices';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import styled, { CSSObject, CSSProperties } from 'styled-components';

const nestedSelectorPropAliases = {
  propsForAfterElement: '&:after',
  propsForBeforeElement: '&:before',
  propsForFirstElement: '&:first-child',
  propsOnFocus: '&:focus, &:focus-within',
  propsOnHover: '&:hover, &:focus, &:focus-within',
  propsForLastElement: '&:last-child',
};

type PropHandler<K extends keyof StyleProps> = {
  aliases?: Array<keyof CSSProperties | keyof ThemedStyles>;
  setDefaults?: CSSObject;
  options:
    | Record<string, string | number | CSSObject>
    | ((args: {
        propName: K;
        props: StyleProps;
        propValue: NonNullable<StyleProps[K]>;
      }) => CSSObject);
};

type PropHandlers = {
  [K in keyof StyleProps]: PropHandler<K>;
};

const propHandlers: PropHandlers = {
  alignItems: {
    aliases: ['justifyContent'],
    setDefaults: {
      display: 'flex',
    },
    options: ({ propName, propValue }) => ({
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
  borderBottomRadius: {
    aliases: ['borderLeftRadius', 'borderRightRadius', 'borderTopRadius'],
    options: ({ propName, propValue }) => {
      const edgeName = propName.replace(/(border|Radius)/g, '');
      const isLeftOrRight = ['Left', 'Right'].includes(edgeName);
      const propNameA = isLeftOrRight
        ? `borderBottom${edgeName}Radius`
        : `border${edgeName}LeftRadius`;
      const propNameB = isLeftOrRight
        ? `borderTop${edgeName}Radius`
        : `border${edgeName}RightRadius`;

      return propsToStyleObject({
        [propNameA]: propValue,
        [propNameB]: propValue,
      });
    },
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
    options: ({ props, propName }) => {
      const borderEdgeName = propName.replace('Color', '') as
        | 'border'
        | 'borderBottom'
        | 'borderLeft'
        | 'borderRight'
        | 'borderTop';
      const borderStyleObject =
        borderStyles[(props[borderEdgeName] ?? 'normal') as BorderStyle];
      const borderColor = props[`${borderEdgeName}Color`] ?? 'border';
      const adjustedBorderColor = adjustColor(
        borderColor,
        props[`${borderEdgeName}ColorLightness`],
        props[`${borderEdgeName}ColorOpacity`]
      );

      return {
        [`${borderEdgeName}Color`]: colorPalette[adjustedBorderColor],
        [`${borderEdgeName}Style`]: borderStyleObject.borderStyle,
        [`${borderEdgeName}Width`]: borderStyleObject.borderWidth,
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
    options: ({ props, propName, propValue }) => {
      const typedPropName = propName as 'color' | 'backgroundColor';

      return {
        [propName]:
          colorPalette[
            adjustColor(
              propValue,
              props[`${typedPropName}Lightness`],
              props[`${typedPropName}Opacity`]
            )
          ],
      };
    },
  },
  colorLightness: {
    aliases: ['colorOpacity'],
    options: ({ props }) => {
      return {
        color:
          colorPalette[
            adjustColor(
              props.color ?? 'text',
              props.colorLightness,
              props.colorOpacity
            )
          ],
      };
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
      gridAutoRows: 'auto',
    },
    options: ({ propName, propValue }) => {
      const typedPropName = propName as 'columns' | 'rows';

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
        [`gridTemplate${upperFirst(typedPropName)}`]: result,
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
      clip: 'rect(0, 0, 0, 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    }),
  },
  margin: {
    aliases: [
      'padding',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
    ],
    options: whiteSpacesAsCSSVariables,
  },
  marginX: {
    aliases: ['marginY', 'paddingX', 'paddingY'],
    options: ({ propName, propValue }) => {
      const typedPropName = propName as
        | 'marginX'
        | 'marginY'
        | 'paddingX'
        | 'paddingY';
      const XorY = typedPropName.includes('X') ? 'X' : 'Y';
      const LeftOrBottom = XorY === 'X' ? 'Left' : 'Bottom';
      const RightOrTop = XorY === 'X' ? 'Right' : 'Top';
      const propNameLeftOrBottom = typedPropName.replace(XorY, LeftOrBottom);
      const propNameRightOrTop = typedPropName.replace(XorY, RightOrTop);

      return propsToStyleObject({
        [`${propNameLeftOrBottom}`]: propValue,
        [`${propNameRightOrTop}`]: propValue,
      });
    },
  },
  propsForAfterElement: {
    aliases: ['propsForBeforeElement'],
    options: ({ propName, propValue }) => ({
      [nestedSelectorPropAliases[
        propName as keyof typeof nestedSelectorPropAliases
      ]]: {
        ...propsToStyleObject(propValue),
        content: `"${propValue.content ?? ''}"`,
      },
    }),
  },
  propsForCustomSelector: {
    options: ({ propValue }) => {
      return Object.fromEntries(
        Object.entries(propValue).map(([customSelector, props]) => [
          customSelector,
          propsToStyleObject(props as any),
        ])
      );
    },
  },
  propsForRoot: {
    aliases: Object.keys(breakpoints).map(
      (breakpointName) => `propsFor${upperFirst(breakpointName)}`
    ) as Array<`propsFor${Capitalize<Breakpoint>}`>,
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
        ? transitionProperty.map(kebabCase).join(', ')
        : kebabCase(transitionProperty) ?? 'all',
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
  propHandler.aliases?.forEach((aliasedPropName: keyof StyleProps) => {
    propHandlers[aliasedPropName] = propHandlers[
      propName as keyof PropHandlers
    ] as PropHandler<any>;
  });
});

const propsToStyleObject: (boxProps: StyleProps) => CSSObject = (boxProps) =>
  Object.keys(boxProps).reduce((acc, propName) => {
    const typedPropName = propName as keyof PropHandlers;

    const propHandler = propHandlers[typedPropName] as PropHandler<
      keyof ThemedStyles
    >;

    const propValue = boxProps[typedPropName];

    if (typeof propValue === 'undefined') {
      return acc;
    }

    if (!propHandler) {
      if (typedPropName === 'debug') {
        console.log(acc);
      }

      return validStyleProps.includes(typedPropName)
        ? {
            ...acc,
            [typedPropName]: propValue,
          }
        : acc;
    }

    const defaults = propHandler.setDefaults ?? {};

    if (typeof propHandler.options === 'function') {
      return {
        ...defaults,
        ...acc,
        ...(propHandler.options as Function)({
          props: boxProps,
          propName: typedPropName,
          propValue,
        }),
      };
    } else if (typeof propHandler.options === 'object') {
      return {
        ...defaults,
        ...acc,
        [typedPropName]:
          propHandler.options[propValue as keyof typeof propHandler.options] ??
          propValue,
      };
    }

    return acc;
  }, {});

const Box = styled('div')(
  <E extends keyof JSX.IntrinsicElements = 'div'>(props: BoxProps<E>) =>
    propsToStyleObject(props.styles ?? {})
);

export { Box };
export { nestedSelectorPropAliases, propsToStyleObject };
