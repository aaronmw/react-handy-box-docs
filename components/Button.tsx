import { Box } from "@/components/Box";
import { BoxProps } from "@/components/Box.types";
import { FormContext } from "@/components/Form";
import { FormFieldClickHandler } from "@/components/Form.types";
import {
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  Ref,
  useContext,
} from "react";

type ButtonProps = Omit<BoxProps<"button">, "ref" | "onClick"> & {
  disabled?: boolean;
  stopClickPropagation?: boolean;
  variant?: keyof typeof variantPropMap;
  onClick?: MouseEventHandler | FormFieldClickHandler;
};

type ButtonPropBuilderFunction = (props: ButtonProps) => ButtonProps;

const getBaseButtonProps: ButtonPropBuilderFunction = (props) => ({
  borderRadius: "small",
  cursor: "pointer",
  display: "inline-block",
  pointerEvents: props.disabled ? "none" : "all",
  width: "fit-content",
  whiteSpace: "nowrap",
  propsOnFocus: {
    boxShadow: "focusRing",
  },
});

const getPrimaryButtonProps: ButtonPropBuilderFunction = (props) => {
  const renderedBaseButtonProps = getBaseButtonProps(props);

  return {
    ...renderedBaseButtonProps,
    backgroundColor: "brand",
    borderRadius: "small",
    boxSizing: "content-box",
    color: "white",
    paddingX: "tight",
    paddingY: "xtight",
    transform: "scale(1)",
    transitionProperty: ["transform"].concat(props.transitionProperty ?? []),
    propsOnHover: {
      ...props.propsOnHover,
      backgroundColor: "purple",
      color: "white",
      transform: "scale(1.1)",
    },
  };
};

const variantPropMap: {
  [key: string]: ButtonPropBuilderFunction;
} = {
  bare: getBaseButtonProps,

  caution: (props) => {
    const renderedPrimaryButtonProps = getPrimaryButtonProps(props);

    return Object.assign(renderedPrimaryButtonProps, {
      borderColor: "transparent",
      color: "danger",
      propsOnHover: {
        ...props.propsOnHover,
        ...renderedPrimaryButtonProps.propsOnHover,
        borderColor: "danger",
      },
    });
  },

  danger: (props) => {
    const renderedPrimaryButtonProps = getPrimaryButtonProps(props);

    return {
      ...renderedPrimaryButtonProps,
      borderColor: "danger",
      borderStyle: "thick",
      color: "danger",
      propsOnHover: {
        ...props.propsOnHover,
        ...renderedPrimaryButtonProps.propsOnHover,
        backgroundColor: "danger",
        borderColor: "danger",
        color: "white",
      },
    };
  },

  iconOnly: getBaseButtonProps,

  primary: getPrimaryButtonProps,
};

const Button = forwardRef(
  (
    {
      children,
      stopClickPropagation = false,
      variant = "primary",
      onClick,
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const formContext = useContext(FormContext);

    return (
      <Box
        as="button"
        ref={ref}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          if (stopClickPropagation) {
            event.stopPropagation();
          }

          return (onClick as FormFieldClickHandler)?.(event, formContext);
        }}
        {...variantPropMap[variant](props)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Button.displayName = "Button";

export { Button };
export { variantPropMap as buttonVariants };
