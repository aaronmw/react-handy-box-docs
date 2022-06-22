import { Color, ColorLightnessAdjustmentValue } from '@/components/Box.types';
import {
  coreColors,
  coreSwatches,
  semanticSwatchAliases,
} from '@/tokens/colorPalette';
import clamp from 'lodash/clamp';

const adjustColorLightness = (
  givenColorName: Color,
  adjustment: ColorLightnessAdjustmentValue
): Color => {
  const adjustableSwatchName =
    givenColorName in coreSwatches
      ? givenColorName
      : givenColorName in coreColors
      ? `${givenColorName}--400`
      : givenColorName in semanticSwatchAliases
      ? Object.keys(coreSwatches).find(
          (coreSwatchName) =>
            coreSwatches[coreSwatchName as keyof typeof coreSwatches] ===
            semanticSwatchAliases[
              givenColorName as keyof typeof semanticSwatchAliases
            ]
        ) ?? null
      : null;

  if (adjustableSwatchName === null) {
    return givenColorName;
  }

  const [colorName, lightnessValue = 400] = adjustableSwatchName.split('--');

  const newLightnessValue = ['+', '-'].includes(String(adjustment)[0])
    ? clamp(Number(lightnessValue) + Number(adjustment), 100, 700)
    : adjustment;

  return `${colorName}--${newLightnessValue}` as Color;
};

export { adjustColorLightness };
