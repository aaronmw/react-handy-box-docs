import { StyleProps } from '@/react-handy-box/components/Box.types';
import { ModalLayerType } from '@/react-handy-box/components/ModalLayer.types';

const backdropStyles = {
  animationDirection: 'normal',
  animationFillMode: 'forwards',
  animationName: 'backdropEntry',
  backgroundColor: 'shadow',
};

const modalLayerStyles: {
  [K in ModalLayerType]: StyleProps;
} = {
  dialog: {},
  menu: {
    // Extends `popover` below
    borderRadius: 'small',
    flexDirection: 'column',
    maxHeight: `calc(100vh - normal * 2)`,
    maxWidth: `calc(100vw - normal * 2)`,
    minWidth: 150,
    overflowY: 'auto',
    padding: 'xtight',
    transitionDuration: 'short',
    transitionProperty: 'opacity',
  },
  popover: {
    backgroundColor: 'background',
    border: 'normal',
    borderRadius: 'normal',
    boxShadow: 'normal',
    padding: 'tight',
  },
  tooltip: {
    backgroundColor: 'text',
    border: undefined,
    borderRadius: 'small',
    color: 'background',
    maxWidth: '20vw',
    paddingX: 'tight',
    paddingY: 'xtight',
  },
  window: {
    animationName: 'modalWindowEntry',
    backgroundColor: 'background',
    border: 'normal',
    borderRadius: 'normal',
    boxShadow: 'normal',
    display: 'flex',
    left: '50%',
    maxHeight: `calc(100vh - normal * 2)`,
    maxWidth: `calc(100vw - normal * 2)`,
    opacity: 0,
    position: 'fixed',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transitionProperty: ['margin-left', 'margin-top', 'opacity', 'transform'],
  },
};

export { backdropStyles, modalLayerStyles };
