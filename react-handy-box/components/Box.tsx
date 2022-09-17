import {
  AnimationName,
  BorderStyle,
  BoxPropsWithRef,
  Breakpoint,
  StyleProps,
  SupportedTags,
  ThemedStyles,
  ThemeObject,
  validStyleProps,
} from '@/react-handy-box/components/Box.types';
import { getAdjustedColorCode } from '@/react-handy-box/utilities/getAdjustedColorCode';
import { animationNames } from '@/tokens/animationNames';
import { borderRadii } from '@/tokens/borderRadii';
import { borderStyles } from '@/tokens/borderStyles';
import { boxShadows } from '@/tokens/boxShadows';
import { breakpoints } from '@/tokens/breakpoints';
import { themes } from '@/tokens/colorPalette';
import { transitionDurations } from '@/tokens/transitionDurations';
import { fontNames } from '@/tokens/typography';
import { whiteSpaceNames } from '@/tokens/whiteSpaces';
import { zIndices } from '@/tokens/zIndices';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import mapValues from 'lodash/mapValues';
import upperFirst from 'lodash/upperFirst';
import styled, {
  css,
  CSSObject,
  CSSProperties,
  Keyframes,
  keyframes,
} from 'styled-components';

const animationKeyframes = Object.fromEntries(
  Object.entries(animationNames).map(([animationName, animation]) => [
    animationName,
    keyframes`${animation.keyframes}`,
  ])
) as Record<AnimationName, Keyframes>;

const whiteSpacesAsCSSVariables = mapValues(
  whiteSpaceNames,
  (_, whiteSpaceName) => `var(--white-space--${whiteSpaceName})`
);

const nestedSelectorPropAliases = {
  stylesForAfterElement: '&:after',
  stylesForBeforeElement: '&:before',
  stylesForFirstElement: '&:first-child',
  stylesOnFocus: '&:focus, &:focus-within',
  stylesOnHover: '&:hover, &:focus, &:focus-within',
  stylesForLastElement: '&:last-child',
};

type PropHandler<K extends keyof StyleProps> = {
  aliases?: Array<keyof CSSProperties | keyof ThemedStyles>;
  setDefaults?: CSSObject;
  options:
    | Record<string, string | number | CSSObject>
    | ((args: {
        styleName: K;
        styles: StyleProps;
        styleValue: NonNullable<StyleProps[K]>;
        theme: ThemeObject;
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
    options: ({ styleName, styleValue }) => ({
      [styleName]: styleValue,
    }),
  },
  animationDuration: {
    options: transitionDurations,
  },
  animationName: {
    options: ({ styleValue: animationName }) => ({
      animationName: css`
        ${animationKeyframes[animationName]}
      `,
      ...animationNames[animationName].style,
    }),
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
    options: ({ styleName, styleValue, theme }) => {
      const edgeName = styleName.replace(/(border|Radius)/g, '');
      const isLeftOrRight = ['Left', 'Right'].includes(edgeName);
      const propNameA = isLeftOrRight
        ? `borderBottom${edgeName}Radius`
        : `border${edgeName}LeftRadius`;
      const propNameB = isLeftOrRight
        ? `borderTop${edgeName}Radius`
        : `border${edgeName}RightRadius`;

      return stylesToStyleObject({
        styles: {
          [propNameA]: styleValue,
          [propNameB]: styleValue,
        },
        theme,
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
    options: ({ styles, styleName, theme }) => {
      const borderEdgeName = styleName.replace('Color', '') as
        | 'border'
        | 'borderBottom'
        | 'borderLeft'
        | 'borderRight'
        | 'borderTop';
      const borderStyleObject =
        borderStyles[(styles[borderEdgeName] ?? 'normal') as BorderStyle];
      const borderColor = styles[`${borderEdgeName}Color`] ?? 'border';
      const adjustedBorderColor = getAdjustedColorCode(
        theme,
        borderColor,
        styles[`${borderEdgeName}ColorLightness`],
        styles[`${borderEdgeName}ColorOpacity`]
      );

      return {
        [`${borderEdgeName}Color`]: adjustedBorderColor,
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
    options: ({ styleValue, theme }) => ({
      boxShadow: boxShadows({ theme })[styleValue] ?? styleValue,
    }),
  },
  color: {
    aliases: ['backgroundColor'],
    options: ({ styleName, styleValue, styles, theme }) => {
      const typedPropName = styleName as 'color' | 'backgroundColor';

      return {
        [styleName]: getAdjustedColorCode(
          theme,
          styleValue,
          styles[`${typedPropName}Lightness`],
          styles[`${typedPropName}Opacity`]
        ),
      };
    },
  },
  colorLightness: {
    aliases: ['colorOpacity'],
    options: ({ styles, theme }) => {
      return {
        color: getAdjustedColorCode(
          theme,
          styles.color ?? 'text',
          styles.colorLightness,
          styles.colorOpacity
        ),
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
    options: ({ styleName, styleValue }) => {
      const typedPropName = styleName as 'columns' | 'rows';

      let result;

      if (typeof styleValue === 'number') {
        result = Array(styleValue).fill('1fr').join(' ');
      } else if (Array.isArray(styleValue)) {
        result = styleValue.join(' ');
      } else {
        result = styleValue;
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
    options: ({ styleValue }) => ({
      flexDirection: styleValue,
    }),
  },
  flexWrap: {
    setDefaults: {
      display: 'flex',
    },
    options: ({ styleValue }) => ({
      flexWrap: styleValue,
    }),
  },
  fontName: {
    options: ({ styleValue }) => fontNames[styleValue],
  },
  fontSize: {
    options: ({ styles: { fontSize, lineHeight } }) => ({
      fontSize: `var(--font-size--${fontSize})`,
      lineHeight: lineHeight ?? `var(--line-height--${fontSize})`,
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
    options: ({ styleName, styleValue, theme }) => {
      const typedPropName = styleName as
        | 'marginX'
        | 'marginY'
        | 'paddingX'
        | 'paddingY';
      const XorY = typedPropName.includes('X') ? 'X' : 'Y';
      const LeftOrBottom = XorY === 'X' ? 'Left' : 'Bottom';
      const RightOrTop = XorY === 'X' ? 'Right' : 'Top';
      const propNameLeftOrBottom = typedPropName.replace(XorY, LeftOrBottom);
      const propNameRightOrTop = typedPropName.replace(XorY, RightOrTop);

      return stylesToStyleObject({
        styles: {
          [`${propNameLeftOrBottom}`]: styleValue,
          [`${propNameRightOrTop}`]: styleValue,
        },
        theme,
      });
    },
  },
  stylesForAfterElement: {
    aliases: ['stylesForBeforeElement'],
    options: ({ styleName, styleValue, theme }) => ({
      [nestedSelectorPropAliases[
        styleName as keyof typeof nestedSelectorPropAliases
      ]]: {
        ...stylesToStyleObject({ styles: styleValue, theme }),
        content: `"${styleValue.content ?? ''}"`,
      },
    }),
  },
  stylesForCustomSelector: {
    options: ({ styleValue, theme }) => {
      return Object.fromEntries(
        Object.entries(styleValue).map(([customSelector, styles]) => [
          customSelector,
          stylesToStyleObject({ styles, theme }),
        ])
      );
    },
  },
  stylesForRoot: {
    aliases: Object.keys(breakpoints).map(
      (breakpointName) => `stylesFor${upperFirst(breakpointName)}`
    ) as Array<`stylesFor${Capitalize<Breakpoint>}`>,
    options: ({ styleName, styleValue, theme }) => {
      const breakpointName = camelCase(
        styleName.replace('stylesFor', '')
      ) as Breakpoint;

      const mediaQuery = breakpoints[breakpointName];

      return {
        [mediaQuery]: stylesToStyleObject({ styles: styleValue, theme }),
      };
    },
  },
  stylesOnHover: {
    aliases: ['stylesOnFocus', 'stylesForFirstElement', 'stylesForLastElement'],
    options: ({ styleName, styleValue, theme }) => {
      const propSelector =
        nestedSelectorPropAliases[
          styleName as keyof typeof nestedSelectorPropAliases
        ];

      return {
        [propSelector!]: stylesToStyleObject({ styles: styleValue, theme }),
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
      styles: {
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

Object.entries(propHandlers).forEach(([styleName, propHandler]) => {
  propHandler.aliases?.forEach((aliasedPropName: keyof StyleProps) => {
    propHandlers[aliasedPropName] = propHandlers[
      styleName as keyof PropHandlers
    ] as PropHandler<any>;
  });
});

const stylesToStyleObject: (args: {
  styles: StyleProps;
  theme: ThemeObject;
}) => CSSObject = ({ styles = {}, theme = {} }) =>
  Object.keys(styles).reduce((acc, styleName) => {
    const typedPropName = styleName as keyof PropHandlers;

    const propHandler = propHandlers[typedPropName] as PropHandler<
      keyof ThemedStyles
    >;

    const styleValue = styles[typedPropName];

    if (typeof styleValue === 'undefined') {
      return acc;
    }

    if (!propHandler) {
      if (typedPropName === 'debug') {
        console.log(acc);
      }

      return validStyleProps.includes(typedPropName)
        ? {
            ...acc,
            [typedPropName]: styleValue,
          }
        : acc;
    }

    const defaults = propHandler.setDefaults ?? {};

    if (typeof propHandler.options === 'function') {
      return {
        ...defaults,
        ...acc,
        ...(propHandler.options as Function)({
          styles,
          styleName: typedPropName,
          styleValue,
          theme,
        }),
      };
    } else if (typeof propHandler.options === 'object') {
      return {
        ...defaults,
        ...acc,
        [typedPropName]:
          propHandler.options[styleValue as keyof typeof propHandler.options] ??
          styleValue,
      };
    }

    return acc;
  }, {});

const Box = styled('div')(
  <E extends SupportedTags = 'div'>(props: BoxPropsWithRef<E>) => {
    return stylesToStyleObject({
      styles: props.styles ?? {},
      theme: props.theme ?? themes.light,
    });
  }
) as <E extends SupportedTags = 'div'>(
  props: BoxPropsWithRef<E>
) => JSX.Element;

export { Box };
export { nestedSelectorPropAliases, stylesToStyleObject };
