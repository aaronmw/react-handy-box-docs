import { forwardRef, MouseEvent, Ref } from 'react';
import { Box } from './Box';
import { BoxProps } from './Box.types';

const getBaseButtonProps = (props: BoxProps<'button'>) => ({
  borderRadius: 'small',
  cursor: 'pointer',
  display: 'inline-block',
  pointerEvents: props.disabled ? 'none' : 'all',
  whiteSpace: 'nowrap',
  propsOnHover: {
    backgroundColor: 'blue--300',
  },
});

const getPrimaryButtonProps = (props: BoxProps<'button'>) => {
  const universalProps = getBaseButtonProps(props);

  return {
    ...universalProps,
    backgroundColor: 'brand',
    borderRadius: 'circle',
    boxSizing: 'content-box',
    color: 'white',
    paddingX: 'loose',
    paddingY: 'normal',
    transform: 'scale(1)',
    transitionProperty: ['transform'].concat(props.transitionProperty ?? []),
    propsOnHover: {
      ...universalProps.propsOnHover,
      ...props.propsOnHover,
      transform: 'scale(1.1)',
    },
  };
};

const variantPropMap = {
  bare: getBaseButtonProps,

  caution: (props: BoxProps<'button'>) => {
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

  danger: (props: BoxProps<'button'>) => {
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

  iconOnly: getBaseButtonProps,

  navigation: (props: BoxProps<'button'>) => {
    const renderedBaseButtonProps = getBaseButtonProps(props);

    return {
      ...renderedBaseButtonProps,
      fontWeight: 'bold',
      paddingY: 'tight',
      propsOnHover: {
        ...renderedBaseButtonProps.propsOnHover,
        ...props.propsOnHover,
        color: 'link--hovered',
      },
    };
  },

  primary: getPrimaryButtonProps,
};

type ButtonProps = BoxProps<'button'> & {
  stopClickPropagation?: boolean;
  variant?: keyof typeof variantPropMap;
};

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  (
    {
      children,
      stopClickPropagation = false,
      variant = 'primary',
      onClick,
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => (
    <Box
      as="button"
      ref={ref}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (stopClickPropagation) {
          event.stopPropagation();
        }

        return onClick?.(event);
      }}
      {...(variantPropMap[variant](props) as BoxProps<'button'>)}
      {...props}
    >
      {children}
    </Box>
  )
);

export { Button };
