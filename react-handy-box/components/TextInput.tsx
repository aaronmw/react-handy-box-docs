import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { useFormField } from '@/react-handy-box/components/Form';
import { CommonFormInputProps } from '@/react-handy-box/components/Form.types';
import { LabeledInput } from '@/react-handy-box/components/LabeledInput';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { inputStyles } from '@/tokens/inputStyles';
import { FocusEventHandler, forwardRef, Ref, useRef } from 'react';

export type SupportedInputTypes =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'email'
  | 'password'
  | 'phone';

export type TextInputProps<T extends SupportedInputTypes = 'text'> =
  (T extends 'textarea' ? BoxProps<'textarea'> : BoxProps<'input'>) & {
    type?: T;
  } & CommonFormInputProps;

const TextInput = forwardRef(
  <T extends SupportedInputTypes = 'text'>(
    {
      disabled,
      isRequired,
      label,
      labelLocation,
      name,
      styles,
      type,
      onChange,
      onRead,
      onReset,
      onValidate,
      ...otherProps
    }: TextInputProps<T>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const inputElementRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const { propsForInput, propsForLabel } = useFormField({
      disabled,
      isRequired,
      name,
      ref: inputElementRef,
      onChange,
      onRead,
      onReset,
      onValidate,
    });

    const handleFocus: FocusEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
      event.target.select();
    };

    return (
      <LabeledInput
        label={label}
        labelLocation={labelLocation}
        ref={ref}
        {...propsForLabel}
      >
        <Box
          as={type === 'textarea' ? 'textarea' : 'input'}
          ref={inputElementRef as any}
          styles={inputStyles}
          type={type === 'textarea' ? undefined : type ?? 'text'}
          onFocus={handleFocus}
          {...propsForInput}
          {...(otherProps as any)}
        />
      </LabeledInput>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };
