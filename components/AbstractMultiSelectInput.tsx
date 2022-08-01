import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { useFormField } from '@/components/Form';
import { CommonFormInputProps } from '@/components/Form.types';
import { LabeledInput } from '@/components/LabeledInput';
import {
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type BaseOptionShape = {
  id: string | number;
  label: ReactNode;
  value: string | number;
};

export type AbstractMultiSelectInputProps<
  T extends BaseOptionShape,
  IsMulti extends boolean
> = Omit<BoxProps, 'defaultValue' | 'ref'> & {
  defaultValue?: IsMulti extends true
    ? Array<string | number>
    : string | number;
  isMultiValue: IsMulti;
  name: string;
  options?: Array<T>;
  renderOptions: (props: {
    options: Array<{
      option: BaseOptionShape;
      propsForOption: BoxProps<'button'>;
      isSelected: boolean;
    }>;
  }) => JSX.Element | Array<JSX.Element>;
} & CommonFormInputProps;

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
      renderOptions,
      onChange,
      onRead,
      onReset,
      onValidate,
      ...otherProps
    }: AbstractMultiSelectInputProps<T, IsMulti>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const { propsForInput, propsForLabel, touched } = useFormField({
      isMultiValue,
      isRequired,
      name,
      onChange,
      onRead,
      onReset: () => {
        setToDefaultValue();
      },
      onValidate,
    });

    const [selectedOptions, setSelectedOptions] = useState<Array<T>>([]);

    const setToDefaultValue = useCallback(() => {
      if (!defaultValue) {
        setSelectedOptions([]);
        return;
      }

      if (
        (isMultiValue && !Array.isArray(defaultValue)) ||
        (!isMultiValue && Array.isArray(defaultValue))
      ) {
        isMultiValue;
        defaultValue;

        throw new Error(
          `\`defaultValue\` type is incompatible with \`isMultiValue={${String(
            isMultiValue
          )}}\``
        );
      }

      const newSelectedOptions = options.filter((option) =>
        isMultiValue
          ? (defaultValue as Array<string | number>).includes(option.value)
          : option.value === defaultValue
      );

      setSelectedOptions(newSelectedOptions);
    }, [defaultValue, isMultiValue, options]);

    useEffect(() => {
      setToDefaultValue();
    }, [defaultValue, isMultiValue, options, setToDefaultValue]);

    const handleClickOption = (option: T) => {
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

      propsForInput.onChange();
      // propsForInput.onBlur();
    };

    useEffect(() => {
      if (touched) {
        propsForInput.onBlur();
      }
    }, [propsForInput, selectedOptions, touched]);

    return (
      <LabeledInput
        label={label}
        labelLocation={labelLocation}
        ref={ref}
        {...propsForLabel}
      >
        <Box {...otherProps}>
          {renderOptions({
            options: options.map((option) => ({
              option,
              propsForOption: {
                cursor: 'pointer',
                key: option.id,
                tabIndex: 1,
                onBlur: propsForInput.onBlur,
                onClick: handleClickOption.bind(null, option),
              },
              isSelected: selectedOptions.includes(option),
            })),
          })}

          {selectedOptions.map((selectedOption) => (
            <input
              key={selectedOption.id}
              type="hidden"
              name={name}
              value={selectedOption.value}
            />
          ))}
        </Box>
      </LabeledInput>
    );
  }
);

AbstractMultiSelectInput.displayName = 'AbstractMultiSelectInput';

export { AbstractMultiSelectInput };
