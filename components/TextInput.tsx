import { Box } from "@/components/Box";
import { BoxProps } from "@/components/Box.types";
import { useFormField } from "@/components/Form";
import { CommonFormInputProps } from "@/components/Form.types";
import { LabeledInput } from "@/components/LabeledInput";
import { useMultipleRefs } from "@/hooks/useMultipleRefs";
import omit from "lodash/omit";
import { FocusEvent, FocusEventHandler, forwardRef, Ref, useRef } from "react";

export type SupportedInputTypes =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "email"
  | "password"
  | "phone";

export type TextInputElementRef<T extends SupportedInputTypes = "text"> =
  T extends "textarea" ? Ref<HTMLTextAreaElement> : Ref<HTMLInputElement>;

export type TextInputProps<T extends SupportedInputTypes = "text"> =
  (T extends "textarea"
    ? Omit<BoxProps<"textarea">, "type" | "as" | "ref"> & {
        type: "textarea";
      }
    : Omit<BoxProps<"input">, "type" | "as" | "ref"> & { type?: T }) &
    CommonFormInputProps;

export const commonInputBoxProps: BoxProps<"input"> = {
  border: "normal",
  borderRadius: "small",
  boxShadow: "inset",
  flexGrow: 1,
  flexShrink: 1,
  paddingX: "tight",
  paddingY: "xtight",
  propsOnFocus: {
    boxShadow: "focusRing",
  },
  resize: "none",
  width: "100%",
};

const TextInput = forwardRef(
  <T extends SupportedInputTypes = "text">(
    {
      isRequired,
      label,
      labelLocation,
      name,
      type = "text",
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

    const { propsForInput, propsForLabel } = useFormField({
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
          as={type === "textarea" ? "textarea" : "input"}
          ref={multipleRefs}
          type={type === "textarea" ? undefined : type}
          onFocus={handleFocus}
          {...commonInputBoxProps}
          {...propsForInput}
          {...props}
        />
      </LabeledInput>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
