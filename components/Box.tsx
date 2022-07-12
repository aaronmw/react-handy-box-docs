import {
  BorderStyle,
  BoxProps,
  Breakpoint,
  validStyleProps,
} from "@/components/Box.types";
import { animationNames } from "@/tokens/animationNames";
import { borderRadii } from "@/tokens/borderRadii";
import { borderStyles } from "@/tokens/borderStyles";
import { boxShadows } from "@/tokens/boxShadows";
import { breakpoints } from "@/tokens/breakpoints";
import { colorPalette } from "@/tokens/colorPalette";
import { transitionDurations } from "@/tokens/transitionDurations";
import { fontNames } from "@/tokens/typography";
import { whiteSpacesAsCSSVariables } from "@/tokens/whiteSpaces";
import { zIndices } from "@/tokens/zIndices";
import { adjustColor } from "@/utilities/adjustColorLightness";
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
import styled, { CSSObject } from "styled-components";

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
  propsForAfterElement: "&:after",
  propsForBeforeElement: "&:before",
  propsForFirstElement: "&:first-child",
  propsOnFocus: "&:focus, &:focus-within",
  propsOnHover: "&:hover, &:focus, &:focus-within",
  propsForLastElement: "&:last-child",
};

const propHandlers: PropHandlers<any> = {
  alignItems: {
    aliases: ["justifyContent"],
    setDefaults: {
      display: "flex",
    },
    options: ({ propName = "alignItems", propValue }) => ({
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
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
      "borderTopLeftRadius",
      "borderTopRightRadius",
    ],
    options: borderRadii,
  },
  borderBottomRadius: {
    aliases: ["borderLeftRadius", "borderRightRadius", "borderTopRadius"],
    options: ({ propName, propValue }) => {
      const edgeName = propName.replace(/(border|Radius)/g, "");
      const isLeftOrRight = ["Left", "Right"].includes(edgeName);
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
      "borderTop",
      "borderRight",
      "borderBottom",
      "borderLeft",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
    ],
    options: ({ props, propName = "border" }) => {
      const borderEdgeName = propName.replace("Color", "");
      const borderStyleObject =
        borderStyles[(props[borderEdgeName] ?? "normal") as BorderStyle];
      const borderColor = props[`${borderEdgeName}Color`] ?? "border";
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
    aliases: ["left", "right", "top"],
    options: whiteSpacesAsCSSVariables,
  },
  boxShadow: {
    options: boxShadows,
  },
  color: {
    aliases: ["backgroundColor"],
    options: ({ props, propName, propValue }) => {
      return {
        [propName]:
          colorPalette[
            adjustColor(
              propValue,
              props[`${propName}Lightness`],
              props[`${propName}Opacity`]
            )
          ],
      };
    },
  },
  colorLightness: {
    aliases: ["colorOpacity"],
    options: ({ props }) => {
      return {
        color:
          colorPalette[
            adjustColor(
              props.color ?? "text",
              props.colorLightness,
              props.colorOpacity
            )
          ],
      };
    },
  },
  columnGap: {
    setDefaults: {
      display: "flex",
      flexDirection: "row",
    },
    options: whiteSpacesAsCSSVariables,
  },
  columns: {
    aliases: ["rows"],
    setDefaults: {
      gridAutoRows: "1fr",
    },
    options: ({ propName = "columns", propValue }) => {
      let result;

      if (typeof propValue === "number") {
        result = Array(propValue).fill("1fr").join(" ");
      } else if (Array.isArray(propValue)) {
        result = propValue.join(" ");
      } else {
        result = propValue;
      }

      return {
        display: "grid",
        [`gridTemplate${upperFirst(propName)}`]: result,
      };
    },
  },
  flexDirection: {
    setDefaults: {
      display: "flex",
    },
    options: ({ propValue }) => ({
      flexDirection: propValue,
    }),
  },
  flexWrap: {
    setDefaults: {
      display: "flex",
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
      display: "grid",
    },
    options: whiteSpacesAsCSSVariables,
  },
  isOnlyForScreenReaders: {
    options: () => ({
      clip: "rect(0, 0, 0, 0)",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
  },
  margin: {
    aliases: [
      "padding",
      "paddingLeft",
      "paddingRight",
      "paddingTop",
      "paddingBottom",
      "marginLeft",
      "marginRight",
      "marginTop",
      "marginBottom",
    ],
    options: whiteSpacesAsCSSVariables,
  },
  marginX: {
    aliases: ["marginY", "paddingX", "paddingY"],
    options: ({ props, propName, propValue }) => {
      const XorY = propName.includes("X") ? "X" : "Y";
      const LeftOrBottom = XorY === "X" ? "Left" : "Bottom";
      const RightOrTop = XorY === "X" ? "Right" : "Top";
      const propNameLeftOrBottom = propName.replace(XorY, LeftOrBottom);
      const propNameRightOrTop = propName.replace(XorY, RightOrTop);

      const adjustmentProps = propName.endsWith("Color")
        ? {
            [`${propNameLeftOrBottom}Opacity`]: props[`${propName}Opacity`],
            [`${propNameLeftOrBottom}Lightness`]: props[`${propName}Lightness`],
            [`${propNameRightOrTop}Opacity`]: props[`${propName}Opacity`],
            [`${propNameRightOrTop}Lightness`]: props[`${propName}Lightness`],
          }
        : {};

      return propsToStyleObject({
        ...adjustmentProps,
        [`${propNameLeftOrBottom}`]: propValue,
        [`${propNameRightOrTop}`]: propValue,
      });
    },
  },
  propsForAfterElement: {
    aliases: ["propsForBeforeElement"],
    options: ({ propName, propValue }) => ({
      [nestedSelectorPropAliases[
        propName as keyof typeof nestedSelectorPropAliases
      ]]: {
        ...propsToStyleObject(propValue),
        content: `"${propValue.content ?? ""}"`,
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
    ),
    options: ({ propName, propValue }) => {
      const breakpointName = camelCase(
        propName.replace("propsFor", "")
      ) as Breakpoint;

      const mediaQuery = breakpoints[breakpointName];

      return {
        [mediaQuery]: propsToStyleObject(propValue),
      };
    },
  },
  propsOnHover: {
    aliases: ["propsOnFocus", "propsForFirstElement", "propsForLastElement"],
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
      display: "flex",
      flexDirection: "column",
    },
    options: whiteSpacesAsCSSVariables,
  },
  transitionDuration: {
    aliases: ["transitionProperty", "transitionTimingFunction"],
    options: ({
      props: {
        transitionDuration,
        transitionProperty,
        transitionTimingFunction,
      },
    }) => ({
      transitionDuration: transitionDurations[transitionDuration ?? "normal"],
      transitionProperty: Array.isArray(transitionProperty)
        ? transitionProperty.join(", ")
        : transitionProperty ?? "all",
      transitionTimingFunction: transitionTimingFunction ?? "ease",
    }),
  },
  zIndex: {
    setDefaults: {
      position: "relative",
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

    if (typeof propValue === "undefined") {
      return acc;
    }

    if (!propHandler) {
      if (propName === "debug") {
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

    if (typeof propHandler.options === "function") {
      return {
        ...defaults,
        ...acc,
        ...propHandler.options({
          props: boxProps,
          propName,
          propValue,
        }),
      };
    } else if (typeof propHandler.options === "object") {
      return {
        ...defaults,
        ...acc,
        [propName]: propHandler.options[propValue] ?? propValue,
      };
    }

    return acc;
  }, {});

const Box: <TagName extends keyof JSX.IntrinsicElements = "div">(
  props: BoxProps<TagName>
) => JSX.Element = styled("div").withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    Object.keys(propHandlers).includes(prop) === false &&
    validStyleProps.includes(prop) === false &&
    defaultValidatorFn(prop),
})(
  <TagName extends keyof JSX.IntrinsicElements = "div">(
    props: BoxProps<TagName>
  ) => propsToStyleObject(props)
);

export { Box };
export { nestedSelectorPropAliases, propsToStyleObject };
