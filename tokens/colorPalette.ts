import {
  ColorLightnessValue,
  SwatchName,
  ThemeName,
  ThemeObject,
  ValidColorSwatchName,
} from '@/react-handy-box/components/Box.types';
import mapValues from 'lodash/mapValues';
import { parseToHsl, rgba, setLightness } from 'polished';

const lightnessLevels = {
  100: -0.925,
  200: -0.775,
  300: -0.6,
  400: 0,
  500: 0.33,
  600: 0.66,
  700: 0.95,
} as const;

const opacityOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

const coreColorDefinitions: Record<
  string,
  {
    code: string;
    lightnessLevels?: typeof lightnessLevels;
  }
> = {
  blue: {
    code: '#1599FF',
  },
  gray: {
    code: '#958F8F',
  },
  green: {
    code: '#00C980',
  },
  orange: {
    code: '#FF5C00',
  },
  pink: {
    code: '#D566DB',
  },
  purple: {
    code: '#9B00E3',
  },
  red: {
    code: '#FF002E',
  },
  teal: {
    code: '#32CCB1',
  },
  yellow: {
    code: '#FFC700',
  },
};

const colorSwatches = Object.keys(coreColorDefinitions).reduce(
  (acc, colorName) => {
    const coreColorName = colorName as keyof typeof coreColorDefinitions;

    const { code: coreColorCode } = coreColorDefinitions[coreColorName];

    const { lightness: baseLightness } = parseToHsl(coreColorCode);

    const adjustedColors = Object.keys(lightnessLevels).reduce(
      (previousValue, lightnessLevel) => {
        const lightnessLevelAsNumber = Number(
          lightnessLevel
        ) as ColorLightnessValue;

        const lightnessAdjustment = lightnessLevels[lightnessLevelAsNumber];

        const adjustedLightness =
          lightnessAdjustment < 0
            ? baseLightness + (1 - baseLightness) * lightnessAdjustment * -1
            : baseLightness - baseLightness * lightnessAdjustment;

        const lightnessColorCode = lightnessAdjustment
          ? setLightness(adjustedLightness, coreColorCode)
          : coreColorCode;

        const alphaColorCodes: Record<string, string> = Object.fromEntries(
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

const swatchNameAliases = [
  'accent',
  'background',
  'border',
  'primary',
  'codeSnippet--comment',
  'codeSnippet--function',
  'codeSnippet--keyword',
  'codeSnippet--string',
  'codeSnippet--tags',
  'codeSnippet--numbers',
  'danger',
  'highlighted',
  'link--hovered',
  'link',
  'selected',
  'selectedText',
  'shaded',
  'shadow',
  'success',
  'text',
  'textFaded',
] as const;

const themeNames = ['light', 'dark'] as const;

const themes: Record<ThemeName, ThemeObject> = {
  light: {
    'accent': 'orange--400',
    'background': 'white',
    'border': 'gray--200',
    'primary': 'purple--400',
    'codeSnippet--comment': 'gray--500',
    'codeSnippet--function': 'red--500',
    'codeSnippet--keyword': 'blue--500',
    'codeSnippet--numbers': 'teal--500',
    'codeSnippet--string': 'purple--500',
    'codeSnippet--tags': 'purple--600',
    'danger': 'red--400',
    'highlighted': 'yellow--300--70',
    'link--hovered': 'purple--200',
    'link': 'blue--400',
    'selected': 'purple--200--40',
    'selectedText': 'purple--400',
    'shaded': 'purple--100--40',
    'shadow': 'gray--400--20',
    'success': 'green--400',
    'text': 'blue--700',
    'textFaded': 'gray--400',
  },
  dark: {
    'accent': 'orange--400',
    'background': 'purple--700',
    'border': 'purple--300--20',
    'primary': 'purple--400',
    'danger': 'red--400',
    'codeSnippet--comment': 'gray--300',
    'codeSnippet--function': 'red--300',
    'codeSnippet--keyword': 'blue--300',
    'codeSnippet--numbers': 'teal--300',
    'codeSnippet--string': 'purple--200',
    'codeSnippet--tags': 'purple--300',
    'highlighted': 'yellow--400--20',
    'link--hovered': 'purple--200',
    'link': 'blue--400',
    'selected': 'purple--400',
    'selectedText': 'white',
    'shaded': 'purple--300--10',
    'shadow': 'purple--600--80',
    'success': 'green--400',
    'text': 'white',
    'textFaded': 'white--translucent',
  },
};

const coreColorCodes = mapValues(coreColorDefinitions, 'code') as {
  [K in keyof typeof coreColorDefinitions]: string;
};

const utilityColors = {
  'black': 'rgba(0, 0, 0, 1)',
  'transparent': 'transparent',
  'white': 'rgba(255, 255, 255, 1)',
  'white--translucent': 'rgba(255, 255, 255, 0.3)',
};

const colorCodesBySwatchName: Record<SwatchName, string> = {
  ...utilityColors,
  ...coreColorCodes,
  ...colorSwatches,
};

export {
  colorCodesBySwatchName,
  colorSwatches,
  themes,
  coreColorCodes,
  coreColorDefinitions,
  lightnessLevels,
  opacityOptions,
  swatchNameAliases,
  themeNames,
  utilityColors,
};
