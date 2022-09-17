import { StyleProps } from '@/react-handy-box/components/Box.types';
import merge from 'lodash/merge';

type ButtonStylesGenerator = (styles?: StyleProps) => StyleProps;

const mergeBaseButtonStyles: ButtonStylesGenerator = (styles) =>
  merge(
    {},
    {
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
    },
    styles
  );

const mergePrimaryButtonStyles: ButtonStylesGenerator = (styles) => {
  const renderedBaseButtonStyles = mergeBaseButtonStyles(styles);

  return merge({}, renderedBaseButtonStyles, {
    backgroundColor: 'primary',
    borderRadius: 'small',
    boxSizing: 'content-box',
    color: 'white',
    paddingX: 'tight',
    paddingY: 'xtight',
    transform: 'scale(1)',
    transitionProperty: ['transform'].concat(
      renderedBaseButtonStyles?.transitionProperty ?? []
    ),
    stylesOnHover: {
      backgroundColor: 'purple',
      color: 'white',
      transform: 'scale(1.05)',
    },
  });
};

const buttonStyles = {
  bare: mergeBaseButtonStyles,

  caution: (styles: StyleProps) =>
    merge({}, mergePrimaryButtonStyles(styles), {
      borderColor: 'transparent',
      color: 'danger',
      stylesOnHover: {
        borderColor: 'danger',
      },
    }),

  danger: (styles: StyleProps) =>
    merge({}, mergePrimaryButtonStyles(styles), {
      borderColor: 'danger',
      borderStyle: 'thick',
      color: 'danger',
      stylesOnHover: {
        backgroundColor: 'danger',
        borderColor: 'danger',
        color: 'white',
      },
    }),

  iconOnly: (styles: StyleProps) =>
    merge({}, mergeBaseButtonStyles(styles), {
      paddingX: 'xtight',
      paddingY: 'xxtight',
      stylesOnHover: {
        color: 'primary',
      },
    }),

  pill: (styles: StyleProps) =>
    merge({}, mergeBaseButtonStyles(styles), {
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

  primary: mergePrimaryButtonStyles,
};

export { buttonStyles };
