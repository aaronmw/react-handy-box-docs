import { BoxProps } from '@/components/Box.types';

type ButtonPropGenerator<TagName extends 'a' | 'button' = 'button'> = (
  props: BoxProps<TagName>
) => BoxProps<TagName>;

const getBaseButtonProps: ButtonPropGenerator = (props) => ({
  borderRadius: 'small',
  cursor: 'pointer',
  display: 'inline-block',
  pointerEvents: props.disabled ? 'none' : 'all',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  propsOnFocus: {
    boxShadow: 'focusRing',
  },
});

const getPrimaryButtonProps: ButtonPropGenerator = (props) => {
  const renderedBaseButtonProps = getBaseButtonProps(props);

  return {
    ...renderedBaseButtonProps,
    backgroundColor: 'brand',
    borderRadius: 'small',
    boxSizing: 'content-box',
    color: 'white',
    paddingX: 'tight',
    paddingY: 'xtight',
    transform: 'scale(1)',
    transitionProperty: ['transform'].concat(props.transitionProperty ?? []),
    propsOnHover: {
      ...props.propsOnHover,
      backgroundColor: 'purple',
      color: 'white',
      transform: 'scale(1.1)',
    },
  };
};

const buttonStyles: {
  [K: string]: ButtonPropGenerator;
} = {
  bare: getBaseButtonProps,

  caution: (props) => {
    const renderedPrimaryButtonProps = getPrimaryButtonProps(props);

    return Object.assign(renderedPrimaryButtonProps, {
      borderColor: 'transparent',
      color: 'danger',
      propsOnHover: {
        ...props.propsOnHover,
        ...renderedPrimaryButtonProps.propsOnHover,
        borderColor: 'danger',
      },
    });
  },

  danger: (props) => {
    const renderedPrimaryButtonProps = getPrimaryButtonProps(props);

    return {
      ...renderedPrimaryButtonProps,
      borderColor: 'danger',
      borderStyle: 'thick',
      color: 'danger',
      propsOnHover: {
        ...props.propsOnHover,
        ...renderedPrimaryButtonProps.propsOnHover,
        backgroundColor: 'danger',
        borderColor: 'danger',
        color: 'white',
      },
    };
  },

  iconOnly: (props) => ({
    ...getBaseButtonProps(props),
    paddingX: 'xtight',
    paddingY: 'xxtight',
  }),

  primary: getPrimaryButtonProps,
};

export { buttonStyles };
