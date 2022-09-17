import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { colorCodesBySwatchName } from '@/tokens/colorPalette';

export const boxShadows = ({ theme }: BoxPropsWithoutRef) => ({
  focusRing: `0 0 0 2px ${colorCodesBySwatchName['white']}, 0 0 0 4px ${
    colorCodesBySwatchName[theme!.primary]
  }`,
  inset: `2px 2px 0 0 ${colorCodesBySwatchName[theme!.shadow]} inset`,
  normal: `0 5px 10px 0 ${colorCodesBySwatchName[theme!.shadow]}`,
});
