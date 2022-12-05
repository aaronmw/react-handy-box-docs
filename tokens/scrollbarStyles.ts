import { StyleProps } from '@/react-handy-box/components/Box.types';

const scrollbarStyles: Record<string, StyleProps> = {
  scrollbar: {
    height: 10,
    width: 10,
  },
  corner: {
    backgroundColor: 'shaded',
  },
  thumb: {
    backgroundColor: 'primary',
    border: 'hairline',
    borderColor: 'background',
    borderRadius: 'circle',
  },
  track: { backgroundColor: 'shaded' },
};

export { scrollbarStyles };
