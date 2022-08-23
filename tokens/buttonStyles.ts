import { BoxProps, StyleProps } from '@/react-handy-box/components/Box.types';
import { ButtonComponentProps } from '@/react-handy-box/components/Button.types';

type ButtonPropGenerator = (
  props: ButtonComponentProps<'a' | 'button'>
) => StyleProps;

const getBaseButtonProps: ButtonPropGenerator = (props) => ({
  borderRadius: 'small',
  cursor: 'pointer',
  display: 'inline-block',
  pointerEvents: (props as any).disabled ? 'none' : 'all',
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
    transitionProperty: ['transform'].concat(
      props.styles?.transitionProperty ?? []
    ),
    propsOnHover: {
      ...props.styles?.propsOnHover,
      backgroundColor: 'purple',
      color: 'white',
      transform: 'scale(1.1)',
    },
  };
};

const buttonStyles: Record<string, ButtonPropGenerator> = {
  bare: getBaseButtonProps,

  caution: (props) => {
    const renderedPrimaryButtonProps = getPrimaryButtonProps(props);

    return Object.assign(renderedPrimaryButtonProps, {
      borderColor: 'transparent',
      color: 'danger',
      propsOnHover: {
        ...props.styles?.propsOnHover,
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
        ...props.styles?.propsOnHover,
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
