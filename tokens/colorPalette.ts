import mapValues from "lodash/mapValues";
import range from "lodash/range";
import { parseToHsl, rgba, setLightness } from "polished";

const defaultLightnessLevels = {
  100: -0.925,
  200: -0.775,
  300: -0.6,
  400: 0,
  500: 0.33,
  600: 0.66,
  700: 0.95,
};

const opacityOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

const coreColorDefinitions = {
  blue: {
    code: "#1599FF",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  gray: {
    code: "#958F8F",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  green: {
    code: "#00C980",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  orange: {
    code: "#FF5C00",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  pink: {
    code: "#D566DB",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  purple: {
    code: "#9B00E3",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  red: {
    code: "#FF002E",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  teal: {
    code: "#32CCB1",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
  yellow: {
    code: "#FFC700",
    lightnessLevels: {
      ...defaultLightnessLevels,
    },
  },
};

type ColorLightnessValue = keyof typeof defaultLightnessLevels;

type ColorOpacityValue = typeof opacityOptions[number] | 100;

type ValidColorSwatchName =
  | `${keyof typeof coreColorDefinitions}--${ColorLightnessValue}`
  | `${keyof typeof coreColorDefinitions}--${ColorLightnessValue}--${ColorOpacityValue}`;

const coreSwatches = Object.keys(coreColorDefinitions).reduce(
  (acc, colorName) => {
    const coreColorName = colorName as keyof typeof coreColorDefinitions;
    const { code: coreColor, lightnessLevels } =
      coreColorDefinitions[coreColorName];
    const { lightness: baseLightness } = parseToHsl(coreColor);

    const adjustedColors = Object.keys(lightnessLevels).reduce(
      (previousValue, lightnessLevel) => {
        const lightnessLevelAsNumber = parseInt(
          lightnessLevel
        ) as keyof typeof lightnessLevels;

        const lightnessAdjustment = lightnessLevels[lightnessLevelAsNumber];

        const adjustedLightness =
          lightnessAdjustment < 0
            ? baseLightness + (1 - baseLightness) * lightnessAdjustment * -1
            : baseLightness - baseLightness * lightnessAdjustment;

        const lightnessColorCode = lightnessAdjustment
          ? setLightness(adjustedLightness, coreColor)
          : coreColor;

        const alphaColorCodes = Object.fromEntries(
          opacityOptions.map((opacityOption) => [
            `${coreColorName}--${lightnessLevel}--${opacityOption}`,
            rgba(lightnessColorCode, opacityOption / 100),
          ])
        );

        return {
          ...previousValue,
          ...alphaColorCodes,
          [`${coreColorName}--${lightnessLevel}`]: lightnessColorCode,
        };
      },
      {}
    );

    return {
      ...acc,
      ...adjustedColors,
    };
  },
  {} as {
    [K in ValidColorSwatchName]: string;
  }
);

const semanticSwatchAliases = {
  "border": coreSwatches["gray--200"],
  "brand": coreSwatches["purple--400"],
  "danger": coreSwatches["red--400"],
  "highlighted": coreSwatches["purple--300"],
  "link--hovered": coreSwatches["purple--200"],
  "link": coreSwatches["blue--400"],
  "selected": coreSwatches["purple--100"],
  "shaded": coreSwatches["purple--100--40"],
  "shadow": coreSwatches["gray--400--20"],
  "text": coreSwatches["blue--700"],
  "textFaded": coreSwatches["gray--400"],
};

const coreColors = mapValues(coreColorDefinitions, "code") as {
  [K in keyof typeof coreColorDefinitions]: string;
};

const utilityColors = {
  "black": "rgba(0, 0, 0, 1)",
  "transparent": "transparent",
  "white": "rgba(255, 255, 255, 1)",
  "white--translucent": "rgba(255, 255, 255, 0.3)",
};

const colorPalette = {
  ...coreColors,
  ...coreSwatches,
  ...semanticSwatchAliases,
  ...utilityColors,
};

export type { ColorOpacityValue, ColorLightnessValue, ValidColorSwatchName };
export {
  coreColors,
  coreColorDefinitions,
  coreSwatches,
  semanticSwatchAliases,
  colorPalette,
  utilityColors,
};
