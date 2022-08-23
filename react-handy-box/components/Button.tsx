import { Box } from '@/react-handy-box/components/Box';
import { ButtonComponentProps } from '@/react-handy-box/components/Button.types';
import { FormContext } from '@/react-handy-box/components/Form';
import { FormFieldClickHandler } from '@/react-handy-box/components/Form.types';
import { buttonStyles } from '@/tokens/buttonStyles';
import { forwardRef, MouseEvent, Ref, useContext } from 'react';

const Button = forwardRef(
  (
    {
      children,
      stopClickPropagation = false,
      styles,
      variant = 'primary',
      onClick,
      ...otherProps
    }: ButtonComponentProps<'button'>,
    ref: Ref<HTMLButtonElement>
  ) => {
    const formContext = useContext(FormContext);

    return (
      <Box
        as="button"
        ref={ref}
        styles={{ ...buttonStyles[variant](otherProps), ...styles }}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          if (stopClickPropagation) {
            event.stopPropagation();
          }

          return (onClick as FormFieldClickHandler)?.(event, formContext);
        }}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

Button.displayName = 'Button';

const AnchorButton = forwardRef(
  (
    {
      children,
      variant = 'primary',
      styles = {},
      ...otherProps
    }: ButtonComponentProps<'a'>,
    ref: Ref<HTMLAnchorElement>
  ) => {
    return (
      <Box
        as="a"
        ref={ref}
        styles={{ ...buttonStyles[variant](otherProps), ...styles }}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

AnchorButton.displayName = 'AnchorButton';

export { AnchorButton, Button };
