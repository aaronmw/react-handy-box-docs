import { colorPalette } from '@/tokens/colorPalette';

export const boxShadows = {
  focusRing: `0 0 0 2px ${colorPalette['white']}, 0 0 0 4px ${colorPalette['brand']}`,
  inset: `2px 2px 0 0 ${colorPalette['shadow']} inset`,
  normal: `0 5px 10px 0 ${colorPalette['shadow']}`,
};
