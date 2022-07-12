import {
  Color,
  ColorLightnessAdjustmentValue,
  ColorOpacityAdjustmentValue,
} from "@/components/Box.types";
import {
  coreColors,
  coreSwatches,
  semanticSwatchAliases,
} from "@/tokens/colorPalette";
import clamp from "lodash/clamp";

const getAdjustableSwatchName = (givenColorName: Color) =>
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

const adjustColor = (
  givenColorName: Color,
  lightnessAdjustment: ColorLightnessAdjustmentValue | undefined,
  alphaAdjustment: ColorOpacityAdjustmentValue | undefined
): Color => {
  const adjustableSwatchName = getAdjustableSwatchName(givenColorName);

  if (adjustableSwatchName === null) {
    return givenColorName;
  }

  const [colorName, lightnessValue = 400, alphaValue = 100] =
    adjustableSwatchName.split("--");

  const newOpacityValue = alphaAdjustment
    ? ["+", "-"].includes(String(alphaAdjustment)[0])
      ? clamp(Number(alphaValue) + Number(alphaAdjustment), 10, 100)
      : alphaAdjustment
    : alphaValue;

  const newLightnessValue = lightnessAdjustment
    ? ["+", "-"].includes(String(lightnessAdjustment)[0])
      ? clamp(Number(lightnessValue) + Number(lightnessAdjustment), 100, 700)
      : lightnessAdjustment
    : lightnessValue;

  return `${colorName}--${newLightnessValue}${
    newOpacityValue === 100 ? "" : `--${newOpacityValue}`
  }` as Color;
};

export { adjustColor };
