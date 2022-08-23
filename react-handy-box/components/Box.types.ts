import { ComponentPropsWithRef } from 'react';
// https://github.com/kripod/react-polymorphic-box/blob/main/src/Box.tsx
import { animationNames } from '@/tokens/animationNames';
import { borderRadii } from '@/tokens/borderRadii';
import { borderStyles } from '@/tokens/borderStyles';
import { boxShadows } from '@/tokens/boxShadows';
import { breakpoints } from '@/tokens/breakpoints';
import {
  ColorLightnessValue,
  ColorOpacityValue,
  colorPalette,
} from '@/tokens/colorPalette';
import { transitionDurations } from '@/tokens/transitionDurations';
import { fontNames, fontSizes } from '@/tokens/typography';
import { whiteSpaceNames } from '@/tokens/whiteSpaces';
import { zIndices } from '@/tokens/zIndices';
import { CSSProperties, ReactNode } from 'react';

export type AnimationDuration = TransitionDuration | `${number}${TimeUnit}`;

export type AnimationName = keyof typeof animationNames;

export type BorderRadius = keyof typeof borderRadii | Length | number;

export type BorderStyle = keyof typeof borderStyles;

export type Breakpoint = keyof typeof breakpoints;

export type BoxShadow = keyof typeof boxShadows;

export type Color = keyof typeof colorPalette;

export type ColorLightnessAdjustmentValue =
  | ColorLightnessValue
  | `${'+' | '-'}${ColorLightnessValue}`;

export type ColorOpacityAdjustmentValue =
  | ColorOpacityValue
  | `${'+' | '-'}${ColorOpacityValue}`;

export type ColumnsOrRows = number | Array<number | string>;

export type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type FontName = keyof typeof fontNames;

export type FontSize = keyof typeof fontSizes | Length;

export type GridSpace = keyof typeof whiteSpaceNames;

export type GridSpaceOrLength = GridSpace | Length | number;

export type Length = `${number}${LengthUnit}` | 'auto' | `calc(${string})`;

export type TimeUnit = 's' | 'ms';

export type TransitionDuration = keyof typeof transitionDurations;

export type LengthUnit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw';

export type ZIndex = keyof typeof zIndices | number;

export const validStyleProps = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'alignmentBaseline',
  'all',
  'animation',
  'animationDelay',
  'animationDirection',
  'animationDuration',
  'animationFillMode',
  'animationIterationCount',
  'animationName',
  'animationPlayState',
  'animationTimingFunction',
  'appearance',
  'backdropFilter',
  'backfaceVisibility',
  'background',
  'backgroundAttachment',
  'backgroundBlendMode',
  'backgroundClip',
  'backgroundColor',
  'backgroundImage',
  'backgroundOrigin',
  'backgroundPosition',
  'backgroundPositionX',
  'backgroundPositionY',
  'backgroundRepeat',
  'backgroundRepeatX',
  'backgroundRepeatY',
  'backgroundSize',
  'baselineShift',
  'blockSize',
  'border',
  'borderBlockEnd',
  'borderBlockEndColor',
  'borderBlockEndStyle',
  'borderBlockEndWidth',
  'borderBlockStart',
  'borderBlockStartColor',
  'borderBlockStartStyle',
  'borderBlockStartWidth',
  'borderBottom',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderCollapse',
  'borderColor',
  'borderImage',
  'borderImageOutset',
  'borderImageRepeat',
  'borderImageSlice',
  'borderImageSource',
  'borderImageWidth',
  'borderInlineEnd',
  'borderInlineEndColor',
  'borderInlineEndStyle',
  'borderInlineEndWidth',
  'borderInlineStart',
  'borderInlineStartColor',
  'borderInlineStartStyle',
  'borderInlineStartWidth',
  'borderLeft',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRight',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderSpacing',
  'borderStyle',
  'borderTop',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'boxSizing',
  'breakAfter',
  'breakBefore',
  'breakInside',
  'bufferedRendering',
  'captionSide',
  'caretColor',
  'clear',
  'clip',
  'clipPath',
  'clipRule',
  'color',
  'colorInterpolation',
  'colorInterpolationFilters',
  'colorRendering',
  'columnCount',
  'columnFill',
  'columnGap',
  'columnRule',
  'columnRuleColor',
  'columnRuleStyle',
  'columnRuleWidth',
  'columnSpan',
  'columnWidth',
  'columns',
  'contain',
  'content',
  'counterIncrement',
  'counterReset',
  'cursor',
  'cx',
  'cy',
  'd',
  'direction',
  'display',
  'dominantBaseline',
  'emptyCells',
  'fill',
  'fillOpacity',
  'fillRule',
  'filter',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexFlow',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'float',
  'floodColor',
  'floodOpacity',
  'font',
  'fontDisplay',
  'fontFamily',
  'fontFeatureSettings',
  'fontKerning',
  'fontSize',
  'fontStretch',
  'fontStyle',
  'fontVariant',
  'fontVariantCaps',
  'fontVariantEastAsian',
  'fontVariantLigatures',
  'fontVariantNumeric',
  'fontVariationSettings',
  'fontWeight',
  'gap',
  'grid',
  'gridArea',
  'gridAutoColumns',
  'gridAutoFlow',
  'gridAutoRows',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnGap',
  'gridColumnStart',
  'gridGap',
  'gridRow',
  'gridRowEnd',
  'gridRowGap',
  'gridRowStart',
  'gridTemplate',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'height',
  'hyphens',
  'imageRendering',
  'inlineSize',
  'isolation',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'left',
  'letterSpacing',
  'lightingColor',
  'lineBreak',
  'lineHeight',
  'listStyle',
  'listStyleImage',
  'listStylePosition',
  'listStyleType',
  'margin',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marker',
  'markerEnd',
  'markerMid',
  'markerStart',
  'mask',
  'maskType',
  'maxBlockSize',
  'maxHeight',
  'maxInlineSize',
  'maxWidth',
  'maxZoom',
  'minBlockSize',
  'minHeight',
  'minInlineSize',
  'minWidth',
  'minZoom',
  'mixBlendMode',
  'objectFit',
  'objectPosition',
  'offset',
  'offsetDistance',
  'offsetPath',
  'offsetRotate',
  'opacity',
  'order',
  'orientation',
  'orphans',
  'outline',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'overflow',
  'overflowAnchor',
  'overflowWrap',
  'overflowX',
  'overflowY',
  'overscrollBehavior',
  'overscrollBehaviorBlock',
  'overscrollBehaviorInline',
  'overscrollBehaviorX',
  'overscrollBehaviorY',
  'padding',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'page',
  'pageBreakAfter',
  'pageBreakBefore',
  'pageBreakInside',
  'paintOrder',
  'perspective',
  'perspectiveOrigin',
  'placeContent',
  'placeItems',
  'placeSelf',
  'pointerEvents',
  'position',
  'quotes',
  'r',
  'resize',
  'right',
  'rowGap',
  'rx',
  'ry',
  'scrollBehavior',
  'scrollMargin',
  'scrollMarginBlock',
  'scrollMarginBlockEnd',
  'scrollMarginBlockStart',
  'scrollMarginBottom',
  'scrollMarginInline',
  'scrollMarginInlineEnd',
  'scrollMarginInlineStart',
  'scrollMarginLeft',
  'scrollMarginRight',
  'scrollMarginTop',
  'scrollPadding',
  'scrollPaddingBlock',
  'scrollPaddingBlockEnd',
  'scrollPaddingBlockStart',
  'scrollPaddingBottom',
  'scrollPaddingInline',
  'scrollPaddingInlineEnd',
  'scrollPaddingInlineStart',
  'scrollPaddingLeft',
  'scrollPaddingRight',
  'scrollPaddingTop',
  'scrollSnapAlign',
  'scrollSnapStop',
  'scrollSnapType',
  'shapeImageThreshold',
  'shapeMargin',
  'shapeOutside',
  'shapeRendering',
  'size',
  'speak',
  'src',
  'stopColor',
  'stopOpacity',
  'stroke',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'tabSize',
  'tableLayout',
  'textAlign',
  'textAlignLast',
  'textAnchor',
  'textCombineUpright',
  'textDecoration',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationSkipInk',
  'textDecorationStyle',
  'textIndent',
  'textOrientation',
  'textOverflow',
  'textRendering',
  'textShadow',
  'textSizeAdjust',
  'textTransform',
  'textUnderlinePosition',
  'top',
  'touchAction',
  'transform',
  'transformBox',
  'transformOrigin',
  'transformStyle',
  'transition',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'unicodeBidi',
  'unicodeRange',
  'userSelect',
  'userZoom',
  'vectorEffect',
  'verticalAlign',
  'visibility',
  'whiteSpace',
  'widows',
  'width',
  'willChange',
  'wordBreak',
  'wordSpacing',
  'wordWrap',
  'writingMode',
  'x',
  'y',
  'zIndex',
  'zoom',
];

export type ThemedStyles = {
  animationDuration?: AnimationDuration;
  animationName?: AnimationName;
  backgroundColor?: Color;
  backgroundColorOpacity?: ColorOpacityAdjustmentValue;
  backgroundColorLightness?: ColorLightnessAdjustmentValue;
  border?: BorderStyle;
  borderBottom?: BorderStyle;
  borderBottomLeftRadius?: BorderRadius;
  borderBottomRadius?: BorderRadius;
  borderBottomRightRadius?: BorderRadius;
  borderColor?: Color;
  borderColorOpacity?: ColorOpacityAdjustmentValue;
  borderColorLightness?: ColorLightnessAdjustmentValue;
  borderBottomColor?: Color;
  borderBottomColorOpacity?: ColorOpacityAdjustmentValue;
  borderBottomColorLightness?: ColorLightnessAdjustmentValue;
  borderLeftColor?: Color;
  borderLeftColorOpacity?: ColorOpacityAdjustmentValue;
  borderLeftColorLightness?: ColorLightnessAdjustmentValue;
  borderRightColor?: Color;
  borderRightColorOpacity?: ColorOpacityAdjustmentValue;
  borderRightColorLightness?: ColorLightnessAdjustmentValue;
  borderTopColor?: Color;
  borderTopColorOpacity?: ColorOpacityAdjustmentValue;
  borderTopColorLightness?: ColorLightnessAdjustmentValue;
  borderLeft?: BorderStyle;
  borderLeftRadius?: BorderRadius;
  borderRadius?: BorderRadius;
  borderRight?: BorderStyle;
  borderRightRadius?: BorderRadius;
  borderTop?: BorderStyle;
  borderTopLeftRadius?: BorderRadius;
  borderTopRadius?: BorderRadius;
  borderTopRightRadius?: BorderRadius;
  bottom?: GridSpaceOrLength;
  boxShadow?: BoxShadow;
  children?: ReactNode;
  color?: Color;
  colorOpacity?: ColorOpacityAdjustmentValue;
  colorLightness?: ColorLightnessAdjustmentValue;
  columnGap?: GridSpaceOrLength;
  columns?: ColumnsOrRows;
  debug?: boolean;
  fontName?: FontName;
  fontSize?: FontSize;
  gap?: GridSpaceOrLength;
  height?: GridSpaceOrLength;
  isOnlyForScreenReaders?: boolean;
  left?: GridSpaceOrLength;
  lineHeight?: FontSize;
  margin?: GridSpaceOrLength;
  marginBottom?: GridSpaceOrLength;
  marginLeft?: GridSpaceOrLength;
  marginRight?: GridSpaceOrLength;
  marginTop?: GridSpaceOrLength;
  /** Sets both `marginLeft` and `marginRight` */
  marginX?: GridSpaceOrLength;
  /** Sets both `marginTop` and `marginBottom` */
  marginY?: GridSpaceOrLength;
  maxHeight?: GridSpaceOrLength;
  maxWidth?: GridSpaceOrLength;
  minHeight?: GridSpaceOrLength;
  minWidth?: GridSpaceOrLength;
  padding?: GridSpaceOrLength;
  paddingBottom?: GridSpaceOrLength;
  paddingLeft?: GridSpaceOrLength;
  paddingRight?: GridSpaceOrLength;
  paddingTop?: GridSpaceOrLength;
  /** Sets both `paddingLeft` and `paddingRight` */
  paddingX?: GridSpaceOrLength;
  /** Sets both `paddingTop` and `paddingBottom` */
  paddingY?: GridSpaceOrLength;
} & {
  [K in `propsFor${Capitalize<Breakpoint>}`]?: StyleProps;
} & {
  /** `BoxProps` to be applied to the `::after` psuedo element.
   * `content` is set to `""` automatically. */
  propsForAfterElement?: StyleProps;
  /** `BoxProps` to be applied to the `::before` psuedo element.
   * `content` is set to `""` automatically. */
  propsForBeforeElement?: StyleProps;
  propsForCustomSelector?: {
    [selector: string]: StyleProps;
  };
  propsForFirstElement?: StyleProps;
  propsForLastElement?: StyleProps;
  /** `BoxProps` to be applied on `:focus` and `:focus-within`.
   *
   * Example:
   * ```
   * <Box
   *   propsOnFocus={{
   *     outline: '1px 1px 5px blue',
   *   }}
   * >
   *   My background turns red on hover.
   * </Box>
   * ```
   */
  propsOnFocus?: StyleProps;
  /** `BoxProps` to be applied on `:hover` or `:focus`.
   *
   * Example:
   * ```
   * <Box
   *   propsOnHover={{
   *     backgroundColor: 'danger',
   *   }}
   * >
   *   My background turns red on hover.
   * </Box>
   * ```
   */
  propsOnHover?: StyleProps;
  pointerEvents?: 'all' | 'auto' | 'none';
  right?: GridSpaceOrLength;
  rowGap?: GridSpaceOrLength;
  rows?: ColumnsOrRows;
  top?: GridSpaceOrLength;
  transitionDuration?: TransitionDuration;
  transitionProperty?: string | Array<string>;
  width?: GridSpaceOrLength | 'fit-content';
  zIndex?: ZIndex;
};

export type StyleProps<T = ThemedStyles> = Omit<CSSProperties, keyof T> & T;

export type BoxProps<E extends keyof JSX.IntrinsicElements = 'div'> =
  ComponentPropsWithRef<E> & {
    as?: E;
    styles?: StyleProps;
  };
