import { forwardRef, ReactNode, Ref, useEffect, useRef, useState } from 'react';
import { Box } from './Box';
import { BoxProps } from './Box.types';
import { CommonFormInputProps, useFormField } from './Form';
import { LabeledInput } from './LabeledInput';

export type BaseOptionShape = {
  id: string | number;
  label: ReactNode;
  value: string | number;
};

export type AbstractMultiSelectInputProps<
  T extends BaseOptionShape,
  IsMulti extends boolean
> = Omit<BoxProps<'div'>, 'defaultValue' | 'ref'> & {
  defaultValue?: IsMulti extends true
    ? Array<string | number>
    : string | number;
  isMultiValue: IsMulti;
  name: string;
  options?: Array<T>;
  renderOption: (props: {
    option: BaseOptionShape;
    optionProps: unknown;
    isSelected: boolean;
  }) => JSX.Element;
} & CommonFormInputProps;

// eslint-disable-next-line react/display-name
const AbstractMultiSelectInput = forwardRef(
  <T extends BaseOptionShape, IsMulti extends boolean>(
    {
      defaultValue,
      id,
      isMultiValue,
      isRequired,
      label,
      labelLocation,
      name,
      options = [],
      renderOption,
      onChange,
      onRead,
      onReset,
      onValidate,
      ...otherProps
    }: AbstractMultiSelectInputProps<T, IsMulti>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const inputElementRef = useRef<HTMLInputElement>(null);

    const { inputProps, labelProps } = useFormField({
      isMultiValue,
      isRequired,
      name,
      ref: inputElementRef,
      onChange,
      onReset,
      onValidate,
    });

    const [selectedOptions, setSelectedOptions] = useState<Array<T>>([]);

    useEffect(() => {
      if (!defaultValue) {
        return;
      }

      if (
        (isMultiValue && !Array.isArray(defaultValue)) ||
        (!isMultiValue && Array.isArray(defaultValue))
      ) {
        isMultiValue;
        defaultValue;

        throw new Error(
          '`defaultValue` type is incompatible with value of `isMultiValue`'
        );
      }

      const newSelectedOptions = options.filter((option) =>
        isMultiValue
          ? (defaultValue as Array<string | number>).includes(option.value)
          : option.value === defaultValue
      );

      setSelectedOptions(newSelectedOptions);
    }, [defaultValue, isMultiValue, options]);

    const handleClick = (option: T) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions((currentSelectedOptions) =>
          currentSelectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        );
      } else if (isMultiValue) {
        setSelectedOptions((currentSelectedOptions) =>
          currentSelectedOptions.concat(option)
        );
      } else {
        setSelectedOptions([option]);
      }

      inputProps.onChange();
    };

    return (
      <LabeledInput
        label={label}
        labelLocation={labelLocation}
        ref={ref}
        {...labelProps}
      >
        <Box {...otherProps}>
          {options.map((option) =>
            renderOption({
              option,
              optionProps: {
                cursor: 'pointer',
                key: option.id,
                tabIndex: 1,
                onBlur: inputProps.onBlur,
                onFocus: inputProps.onFocus,
                onClick: handleClick.bind(null, option),
              },
              isSelected: selectedOptions.includes(option),
            })
          )}
          {selectedOptions.map((selectedOption) => (
            <input
              key={selectedOption.id}
              type="hidden"
              name={name}
              ref={inputElementRef}
              value={selectedOption.value}
            />
          ))}
        </Box>
      </LabeledInput>
    );
  }
);

export { AbstractMultiSelectInput };
