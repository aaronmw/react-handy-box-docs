import { StyleProps } from '@/react-handy-box/components/Box.types';
import merge from 'lodash/merge';

type ButtonStylesGenerator = (styles?: StyleProps) => StyleProps;

const mergeBaseButtonStyles: ButtonStylesGenerator = (styles) =>
  merge(
    {
      borderRadius: 'small',
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
      },
      width: 'fit-content',
      whiteSpace: 'nowrap',
    },
    styles
  );

const mergePrimaryButtonStyles: ButtonStylesGenerator = (styles) => {
  const renderedBaseButtonStyles = mergeBaseButtonStyles(styles);

  return merge(renderedBaseButtonStyles, {
    backgroundColor: 'brand',
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

const buttonStyles: Record<string, ButtonStylesGenerator> = {
  bare: mergeBaseButtonStyles,

  caution: (styles) => {
    const renderedPrimaryButtonStyles = mergePrimaryButtonStyles(styles);

    return merge(renderedPrimaryButtonStyles, {
      borderColor: 'transparent',
      color: 'danger',
      stylesOnHover: {
        borderColor: 'danger',
      },
    });
  },

  danger: (styles) => {
    const renderedPrimaryButtonStyles = mergePrimaryButtonStyles(styles);

    return merge(renderedPrimaryButtonStyles, {
      borderColor: 'danger',
      borderStyle: 'thick',
      color: 'danger',
      stylesOnHover: {
        backgroundColor: 'danger',
        borderColor: 'danger',
        color: 'white',
      },
    });
  },

  iconOnly: (styles) => ({
    ...mergeBaseButtonStyles(styles),
    paddingX: 'xtight',
    paddingY: 'xxtight',
  }),

  primary: mergePrimaryButtonStyles,
};

export { buttonStyles };
