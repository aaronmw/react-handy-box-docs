import { BoxProps } from '@/components/Box.types';

const inputStyles: BoxProps<'input'> = {
  backgroundColor: 'white',
  border: 'normal',
  borderRadius: 'small',
  display: 'block',
  flexGrow: 1,
  flexShrink: 1,
  paddingX: 'tight',
  paddingY: 'xtight',
  propsOnFocus: {
    boxShadow: 'focusRing',
  },
  resize: 'none',
  width: '100%',
};

export { inputStyles };
