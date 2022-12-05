import {
  ColorLightnessAdjustmentValue,
  ColorOpacityAdjustmentValue,
  SwatchNameAlias,
  SwatchNameOrAlias,
  ThemeObject,
  UtilityColor,
  ValidColorSwatchName,
} from '@/react-handy-box/components/Box.types';
import {
  colorCodesBySwatchName,
  colorSwatches,
  coreColorCodes,
  utilityColors,
} from '@/tokens/colorPalette';
import clamp from 'lodash/clamp';

const getAdjustableSwatchName = (
  theme: ThemeObject,
  givenColorName: SwatchNameOrAlias
) =>
  givenColorName in colorSwatches
    ? givenColorName
    : givenColorName in coreColorCodes
    ? `${givenColorName}--400`
    : givenColorName in theme
    ? theme[givenColorName as SwatchNameAlias]
    : null;

const getAdjustedColorCode = (
  theme: ThemeObject,
  givenColorName: SwatchNameOrAlias,
  lightnessAdjustment?: ColorLightnessAdjustmentValue,
  alphaAdjustment?: ColorOpacityAdjustmentValue
): string => {
  const adjustableSwatchName = getAdjustableSwatchName(theme, givenColorName);

  if (adjustableSwatchName === null) {
    return givenColorName;
  }

  if (adjustableSwatchName in utilityColors) {
    return utilityColors[adjustableSwatchName as UtilityColor];
  }

  const [colorName, lightnessValue = 400, alphaValue = 100] =
    adjustableSwatchName.split('--');

  const newOpacityValue = alphaAdjustment
    ? ['+', '-'].includes(String(alphaAdjustment)[0])
      ? clamp(Number(alphaValue) + Number(alphaAdjustment), 10, 100)
      : alphaAdjustment
    : alphaValue;

  const newLightnessValue = lightnessAdjustment
    ? ['+', '-'].includes(String(lightnessAdjustment)[0])
      ? clamp(Number(lightnessValue) + Number(lightnessAdjustment), 100, 700)
      : lightnessAdjustment
    : lightnessValue;

  return colorCodesBySwatchName[
    `${colorName}--${newLightnessValue}${
      newOpacityValue === 100 ? '' : `--${newOpacityValue}`
    }` as ValidColorSwatchName
  ] as string;
};

export { getAdjustedColorCode };
