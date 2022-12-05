import { handyStyles } from '@/react-handy-box/utilities/handyStyles';

const baseButtonStyles = handyStyles({
  cursor: 'pointer',
  display: 'inline-block',
  stylesForCustomSelector: {
    ':disabled': {
      opacity: 0.6,
      pointerEvents: 'none',
    },
  },
  stylesOnFocus: {
    boxShadow: 'focusRing',
    position: 'relative',
    zIndex: '1--stickyElements',
  },
  width: 'fit-content',
  whiteSpace: 'nowrap',
});

const primaryButtonStyles = handyStyles(baseButtonStyles, {
  backgroundColor: 'primary',
  borderRadius: 'small',
  boxSizing: 'content-box',
  color: 'white',
  paddingX: 'tight',
  paddingY: 'xtight',
  transform: 'scale(1)',
  transitionProperty: ['transform'],
  stylesOnHover: {
    backgroundColor: 'primary',
    backgroundColorLightness: '+100',
    color: 'white',
    transform: 'scale(1.05)',
  },
});

const buttonStyles = {
  bare: baseButtonStyles,

  caution: handyStyles(primaryButtonStyles, {
    borderColor: 'transparent',
    color: 'danger',
    stylesOnHover: {
      borderColor: 'danger',
    },
  }),

  danger: handyStyles(primaryButtonStyles, {
    borderColor: 'transparent',
    color: 'danger',
    stylesOnHover: {
      borderColor: 'danger',
    },
  }),

  iconOnly: handyStyles(baseButtonStyles, {
    paddingX: 'xtight',
    paddingY: 'xxtight',
    stylesOnHover: {
      color: 'primary',
    },
  }),

  pill: handyStyles(baseButtonStyles, {
    alignItems: 'center',
    backgroundColor: 'selected',
    borderRadius: 'small',
    columnGap: 'xtight',
    cursor: 'pointer',
    display: 'flex',
    paddingX: 'tight',
    paddingY: 'xxtight',
    stylesOnHover: {
      backgroundColor: 'selected',
      backgroundColorLightness: '+100',
    },
  }),

  primary: primaryButtonStyles,

  textLink: handyStyles(baseButtonStyles, {
    color: 'link',
    cursor: 'pointer',
    fontWeight: 'bold',
    stylesOnHover: {
      color: 'link--hovered',
    },
    textDecoration: 'underline',
    whiteSpace: 'normal',
  }),
};

export { buttonStyles };
