import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { useFormField } from '@/react-handy-box/components/Form';
import { CommonFormInputProps } from '@/react-handy-box/components/Form.types';
import { LabeledInput } from '@/react-handy-box/components/LabeledInput';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { inputStyles } from '@/tokens/inputStyles';
import { FocusEventHandler, forwardRef, memo, Ref, useRef } from 'react';

export type SupportedInputTypes =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'email'
  | 'password'
  | 'phone';

export type TextInputElementRef<T extends SupportedInputTypes = 'text'> =
  T extends 'textarea' ? Ref<HTMLTextAreaElement> : Ref<HTMLInputElement>;

export type TextInputProps<T extends SupportedInputTypes = 'text'> =
  (T extends 'textarea'
    ? Omit<BoxProps<'textarea'>, 'as' | 'ref' | 'type'> & {
        type: 'textarea';
      }
    : Omit<BoxProps<'input'>, 'as' | 'ref' | 'type'> & { type?: T }) &
    CommonFormInputProps;

const TextInput = forwardRef(
  <T extends SupportedInputTypes = 'text'>(
    {
      disabled,
      isRequired,
      label,
      labelLocation,
      name,
      type = 'text',
      onChange,
      onRead,
      onReset,
      onValidate,
      ...otherProps
    }: TextInputProps<T>,
    ref: TextInputElementRef<T>
  ): JSX.Element => {
    const inputElementRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const multipleRefs = useMultipleRefs(ref, inputElementRef);

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
        {...propsForLabel}
      >
        <Box
          as={type === 'textarea' ? 'textarea' : 'input'}
          ref={multipleRefs}
          type={type === 'textarea' ? undefined : type}
          onFocus={handleFocus}
          {...inputStyles}
          {...propsForInput}
          {...otherProps}
        />
      </LabeledInput>
    );
  }
);

TextInput.displayName = 'TextInput';

export { inputStyles };
export { TextInput };
