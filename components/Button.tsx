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
    backgroundColor: 'purple',
    color: 'white',
  },
});

const getPrimaryButtonProps = (props: BoxProps<'button'>) => {
  const universalProps = getBaseButtonProps(props);

  return {
    ...universalProps,
    backgroundColor: 'white',
    borderRadius: 'small',
    boxSizing: 'content-box',
    color: 'text',
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

type BaseButtonProps<AsAnchor extends boolean> = {
  asAnchor?: AsAnchor;
  stopClickPropagation?: boolean;
  variant?: keyof typeof variantPropMap;
};

// TODO: Improve this type definition
type ButtonProps<AsAnchor extends boolean> = AsAnchor extends true
  ? Omit<BoxProps<'a'>, 'as' | 'ref'> & BaseButtonProps<AsAnchor>
  : Omit<BoxProps<'button'>, 'as' | 'ref'> & BaseButtonProps<AsAnchor>;

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  <AsAnchor extends boolean>(
    {
      asAnchor = false,
      children,
      stopClickPropagation = false,
      variant = 'primary',
      onClick,
      ...props
    }: ButtonProps<AsAnchor>,
    ref: AsAnchor extends true ? Ref<HTMLAnchorElement> : Ref<HTMLButtonElement>
  ) => (
    <Box
      as={asAnchor ? 'a' : 'button'}
      ref={ref}
      onClick={(event: MouseEvent<any>) => {
        if (stopClickPropagation) {
          event.stopPropagation();
        }

        return onClick?.(event);
      }}
      {...(variantPropMap as any)[variant](props)}
      {...props}
    >
      {children}
    </Box>
  )
);

export { Button };
