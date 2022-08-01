import { Box } from '@/components/Box';
import { ButtonComponentProps } from '@/components/Button.types';
import { FormContext } from '@/components/Form';
import { FormFieldClickHandler } from '@/components/Form.types';
import { buttonStyles } from '@/tokens/buttonStyles';
import { forwardRef, MouseEvent, Ref, useContext } from 'react';

const Button = forwardRef(
  (
    {
      children,
      stopClickPropagation = false,
      variant = 'primary',
      onClick,
      ...props
    }: ButtonComponentProps<'button'>,
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
        {...(buttonStyles[variant](props) as any)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Button.displayName = 'Button';

const AnchorButton = forwardRef(
  (
    { children, variant = 'primary', ...props }: ButtonComponentProps<'a'>,
    ref: Ref<HTMLAnchorElement>
  ) => {
    return (
      <Box as="a" ref={ref} {...buttonStyles[variant](props as any)} {...props}>
        {children}
      </Box>
    );
  }
);

AnchorButton.displayName = 'AnchorButton';

export { AnchorButton, Button };
