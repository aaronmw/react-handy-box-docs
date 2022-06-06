import { colorPalette } from './colorPalette';

export const borderStyles = ({
  borderColor = colorPalette['border'],
} = {}) => ({
  dashed: {
    borderColor,
    borderStyle: 'dashed',
    borderWidth: '2px',
  },
  hairline: {
    borderColor,
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  normal: {
    borderColor,
    borderStyle: 'solid',
    borderWidth: '2px',
  },
});
