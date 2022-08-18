import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { useFormField } from '@/react-handy-box/components/Form';
import { CommonFormInputProps } from '@/react-handy-box/components/Form.types';
import { LabeledInput } from '@/react-handy-box/components/LabeledInput';
import {
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type BaseOptionShape = {
  id: string;
  label: ReactNode;
  value: string;
};

export type AbstractMultiSelectInputRenderProps<T extends BaseOptionShape> = {
  options: Array<{
    isSelected: boolean;
    option: T;
    propsForOption: BoxProps<'button'>;
  }>;
};

export type AbstractMultiSelectInputProps<
  T extends BaseOptionShape,
  IsMultiValue extends boolean
> = Omit<BoxProps, 'children' | 'defaultValue' | 'ref'> & {
  defaultValue?: IsMultiValue extends true ? Array<string> : string;
  isMultiValue: IsMultiValue;
  name: string;
  options: Array<T>;
  renderOptions: (
    props: AbstractMultiSelectInputRenderProps<T>
  ) => JSX.Element | Array<JSX.Element>;
} & CommonFormInputProps;

// eslint-disable-next-line react/display-name
const AbstractMultiSelectInput = forwardRef(
  <T extends BaseOptionShape, IsMultiValue extends boolean>(
    {
      defaultValue,
      disabled,
      id,
      isMultiValue,
      isRequired,
      label,
      labelLocation,
      name,
      options,
      renderOptions,
      onChange,
      onRead,
      onReset,
      onValidate,
      ...otherProps
    }: AbstractMultiSelectInputProps<T, IsMultiValue>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const { propsForInput, propsForLabel, touched } = useFormField({
      disabled,
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
          ? (defaultValue as Array<string>).includes(option.value)
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
                tabIndex: 0,
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
) as <T extends BaseOptionShape, IsMultiValue extends boolean>(
  props: AbstractMultiSelectInputProps<T, IsMultiValue> & {
    ref?: Ref<HTMLLabelElement>;
  }
) => JSX.Element;

(AbstractMultiSelectInput as any).displayName = 'AbstractMultiSelectInput';

export { AbstractMultiSelectInput };
