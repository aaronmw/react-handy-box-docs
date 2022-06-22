import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { CommonFormInputProps, useFormField } from '@/components/Form';
import { LabeledInput } from '@/components/LabeledInput';
import { FocusEvent, FocusEventHandler, forwardRef, Ref, useRef } from 'react';
import { useMultipleRefs } from '../hooks';

export type SupportedInputTypes =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'email'
  | 'password'
  | 'phone';

export type TextInputElementRef<T extends SupportedInputTypes> =
  T extends 'textarea' ? Ref<HTMLTextAreaElement> : Ref<HTMLInputElement>;

export type TextInputProps<T extends SupportedInputTypes> =
  (T extends 'textarea'
    ? Omit<BoxProps<'textarea'>, 'type' | 'as' | 'ref'> & {
        type: 'textarea';
      }
    : Omit<BoxProps<'input'>, 'type' | 'as' | 'ref'> & { type: T }) &
    CommonFormInputProps;

export const commonInputBoxProps = {
  flexGrow: 1,
  flexShrink: 1,
  paddingX: 'tight',
  paddingY: 'xtight',
  resize: 'none',
  width: '100%',
} as const;

const TextInput = forwardRef(
  <T extends SupportedInputTypes>(
    {
      isRequired,
      label,
      labelLocation,
      name,
      type,
      onChange,
      onRead,
      onReset,
      onValidate,
      ...props
    }: TextInputProps<T>,
    ref: TextInputElementRef<T>
  ): JSX.Element => {
    const inputElementRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const multipleRefs = useMultipleRefs(ref, inputElementRef);

    const { inputProps, labelProps } = useFormField({
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
      <LabeledInput label={label} labelLocation={labelLocation} {...labelProps}>
        <Box
          as={type === 'textarea' ? 'textarea' : 'input'}
          ref={multipleRefs}
          type={type === 'textarea' ? undefined : type}
          {...commonInputBoxProps}
          {...inputProps}
          onFocus={(
            event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            inputProps?.onFocus();
            handleFocus(event);
          }}
          {...props}
        />
      </LabeledInput>
    );
  }
);

export { TextInput };
