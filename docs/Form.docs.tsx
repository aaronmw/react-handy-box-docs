import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Menu } from '@/react-handy-box/components/Menu';
import { Text } from '@/react-handy-box/components/Text';
import { tokens } from '@/tokens';
import { FormEvent, forwardRef, ReactNode, Ref, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DocumentationPageDescriptor } from '../pages';

const dummyOptions = [
  { key: 'abc', label: 'Apples', value: 'apples' },
  { key: 'def', label: 'Bananas', value: 'bananas' },
  { key: 'ghi', label: 'Cherries', value: 'cherries' },
];

const dummyColumns = [
  {
    key: 'quantity',
    label: 'Quantity',
    propsForCells: {
      styles: {
        textAlign: 'center',
      },
    },
  },
  {
    key: 'itemName',
    label: 'Item Name',
  },
];

const dummyRows = [
  { key: 1, quantity: '6', itemName: 'Apples', value: 'apples' },
  { key: 2, quantity: '3', itemName: 'Bananas', value: 'bananas' },
  {
    key: 3,
    quantity: '7',
    itemName: 'Cherries',
    value: 'cherries',
  },
  { key: 4, quantity: '2', itemName: 'Durians', value: 'durians' },
  {
    key: 5,
    quantity: '4',
    itemName: 'Elderberries',
    value: 'elderberries',
  },
];

const getFormFieldValues = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formElement = event.target as HTMLFormElement;

  const formData = new FormData(formElement);

  const formFieldNames = Array.from(formData.keys());

  const data = Object.fromEntries(
    formFieldNames.map((fieldName) => [fieldName, formData.getAll(fieldName)])
  );

  return data;
};

type FormFieldValues = {
  text_field: string;
  checkboxes_field: Array<string>;
};

const FormDemo = () => {
  const [allFieldsDisabled, setAllFieldsDisabled] = useState(false);
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFieldValues>();

  const onSubmit = (data: any) => console.log(data);

  return (
    <Box styles={{ rowGap: 'normal' }}>
      <Box styles={{ columnGap: 'tight' }}>
        <Button
          variant="pill"
          onClick={() => setAllFieldsDisabled(!allFieldsDisabled)}
        >
          {allFieldsDisabled ? 'Enable' : 'Disable'} All Fields
        </Button>
        <Button
          variant="pill"
          onClick={() => setAllFieldsRequired(!allFieldsRequired)}
        >
          Mark All Fields {allFieldsRequired ? 'Optional' : 'Required'}
        </Button>
      </Box>

      <Box
        as="form"
        styles={{
          rowGap: 'normal',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          disabled={allFieldsDisabled}
          label="Text Field"
          required={allFieldsRequired}
          {...register('text_field')}
        />

        <CheckboxesField
          label="Checkboxes Field"
          options={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
            { label: 'Third', value: 'third' },
          ]}
          {...register('checkboxes_field', {
            disabled: allFieldsDisabled,
            required: allFieldsRequired,
          })}
        />

        {/* <RadiosField
          disabled={allFieldsDisabled}
          label="Radios Field"
          name="radios_field"
          options={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
            { label: 'Third', value: 'third' },
          ]}
          required={allFieldsRequired}
        />

        <SelectField
          disabled={allFieldsDisabled}
          label="Single Select Field"
          name="single_select_field"
          options={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
            { label: 'Third', value: 'third' },
          ]}
          required={allFieldsRequired}
        />

        <SelectField
          disabled={allFieldsDisabled}
          label="Multiple Select Field"
          multiple={true}
          name="multiple_select_field"
          options={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
            { label: 'Third', value: 'third' },
          ]}
          required={allFieldsRequired}
        /> */}

        <Box
          styles={{
            columnGap: 'tight',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

type UniversalFormFieldProps = {
  disabled?: boolean;
  label: ReactNode;
  name: string;
  required?: boolean;
};

type LabeledFormFieldProps = BoxPropsWithoutRef<'label'> &
  Pick<UniversalFormFieldProps, 'disabled' | 'label' | 'required'>;

const LabeledFormField = ({
  children,
  disabled,
  label,
  required,
  ...otherProps
}: LabeledFormFieldProps) => {
  return (
    <Box
      as="label"
      styles={{
        opacity: disabled ? 0.3 : undefined,
        pointerEvents: disabled ? 'none' : undefined,
        rowGap: 'xtight',
      }}
      {...otherProps}
    >
      <Text variant="label">
        {label}
        {required && <Text styles={{ color: 'red' }}> *</Text>}
      </Text>

      {children}
    </Box>
  );
};

const checkableInputTypeIconMap = {
  checkbox: {
    checked: '\f14a', // square-check,
    unchecked: '\f0c8', // square
    indeterminate: '\f146', // square-minus
  },
  radio: {
    checked: '\f192', // circle-dot
    unchecked: '\f111', // circle
  },
} as const;

type CheckableInputProps<T extends 'checkbox' | 'radio'> = Omit<
  BoxPropsWithoutRef<'input'>,
  'type'
> & {
  indeterminate?: T extends 'checkbox' ? boolean : never;
  type: T;
};

const CheckableInput = forwardRef(
  <T extends 'checkbox' | 'radio'>(
    {
      checked = false,
      indeterminate,
      styles,
      type,
      onChange,
      ...otherProps
    }: CheckableInputProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <Box
        styles={{
          display: 'inline-block',
          position: 'relative',
          stylesForCustomSelector: {
            ':focus-within': {
              boxShadow: 'focusRing',
            },
          },
          ...styles,
        }}
      >
        <Box
          as="input"
          className={`js-hidden-${type}-field`}
          ref={ref}
          styles={{
            height: '100%',
            left: 0,
            opacity: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
          type={type}
          {...otherProps}
        />
        <Box
          styles={{
            stylesForBeforeElement: {
              fontName: 'icon',
              content: checkableInputTypeIconMap[type].unchecked,
              color: 'text--faded',
            },
            stylesForCustomSelector: {
              [`.js-hidden-${type}-field:checked + &::before`]: {
                color: 'primary',
                content: checkableInputTypeIconMap[type].checked,
                fontWeight: 900,
              },
              ...(type === 'checkbox'
                ? {
                    [`.js-hidden-checkbox-field:indeterminate + &::before`]: {
                      color: 'primary',
                      content: checkableInputTypeIconMap.checkbox.indeterminate,
                      fontWeight: 900,
                    },
                  }
                : {}),
            },
          }}
        />
      </Box>
    );
  }
);

CheckableInput.displayName = 'CheckableInput';

type CheckableInputFieldProps<T extends 'checkbox' | 'radio'> =
  UniversalFormFieldProps &
    CheckableInputProps<T> & {
      options: Array<{
        label?: ReactNode;
        value: string | number;
      }>;
    };

const CheckableInputsField = forwardRef(
  <T extends 'checkbox' | 'radio'>(
    {
      disabled,
      label,
      options,
      required,
      type,
      ...otherProps
    }: CheckableInputFieldProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const Component = type === 'checkbox' ? Checkbox : Radio;

    return (
      <LabeledFormField disabled={disabled} label={label} required={required}>
        <Box styles={{ flexWrap: 'wrap', gap: 'tight' }}>
          {options.map((option) => (
            <Box as="label" key={option.value} styles={{ columnGap: 'xtight' }}>
              <Component
                disabled={disabled}
                ref={ref}
                value={option.value}
                {...(otherProps as any)}
              />

              {option.label ?? option.value}
            </Box>
          ))}
        </Box>
      </LabeledFormField>
    );
  }
);

CheckableInputsField.displayName = 'CheckableInputsField';

const Checkbox = forwardRef(
  (
    { ...otherProps }: Omit<CheckableInputProps<'checkbox'>, 'type'>,
    ref: Ref<HTMLInputElement>
  ) => {
    return <CheckableInput ref={ref} type="checkbox" {...otherProps} />;
  }
);

Checkbox.displayName = 'Checkbox';

const CheckboxesField = forwardRef(
  (
    props: Omit<CheckableInputFieldProps<'checkbox'>, 'type'>,
    ref: Ref<HTMLInputElement>
  ) => {
    return <CheckableInputsField ref={ref} type="checkbox" {...props} />;
  }
);

CheckboxesField.displayName = 'CheckboxesField';

const Radio = forwardRef(
  (
    { ...otherProps }: Omit<CheckableInputProps<'radio'>, 'type'>,
    ref: Ref<HTMLInputElement>
  ) => {
    return <CheckableInput ref={ref} type="radio" {...otherProps} />;
  }
);

Radio.displayName = 'Radio';

const RadiosField = forwardRef(
  (
    props: Omit<CheckableInputFieldProps<'radio'>, 'type'>,
    ref: Ref<HTMLInputElement>
  ) => {
    return <CheckableInputsField type="radio" {...props} />;
  }
);

RadiosField.displayName = 'RadiosField';

type TextFieldProps = BoxPropsWithoutRef<'input'> & UniversalFormFieldProps;

const TextField = forwardRef(
  (
    { disabled, label, required, ...otherProps }: TextFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <LabeledFormField disabled={disabled} label={label} required={required}>
        <Box
          as="input"
          disabled={disabled}
          ref={ref}
          required={required}
          styles={tokens.inputStyles}
          {...otherProps}
        />
      </LabeledFormField>
    );
  }
);

TextField.displayName = 'TextField';

type SelectFieldProps<IsMultiValue extends boolean> = Omit<
  BoxPropsWithoutRef<'select'>,
  'defaultValue' | 'multiple'
> &
  UniversalFormFieldProps & {
    defaultValue?: IsMultiValue extends true
      ? Array<string | number>
      : string | number;
    multiple?: IsMultiValue;
    options: Array<{
      label?: ReactNode;
      selected?: boolean;
      value: string | number;
    }>;
    readOnly?: boolean;
  };

const SelectField = <IsMultiValue extends boolean>({
  defaultValue,
  disabled,
  label,
  multiple,
  options,
  required,
  ...otherProps
}: SelectFieldProps<IsMultiValue>) => {
  const [selectedOptions, setSelectedOptions] = useState(
    defaultValue
      ? options.filter((option) =>
          multiple
            ? (defaultValue as Array<string | number>).includes(option.value)
            : defaultValue === option.value
        )
      : []
  );

  const deselectOptionValue = (optionValue: string | number) => {
    setSelectedOptions(
      selectedOptions.filter(
        (selectedOption) => selectedOption.value === optionValue
      )
    );
  };

  const selectOptionValue = (optionValue: string | number) => {
    const selectedOption = options.find(
      (option) => option.value === optionValue
    )!;

    setSelectedOptions(
      multiple ? [...selectedOptions, selectedOption] : [selectedOption]
    );
  };

  const optionsAsMenuOptions = options
    .filter((option) => (multiple ? !selectedOptions.includes(option) : true))
    .map(
      (option) =>
        ({
          label: option.label ?? option.value,
          type: 'menu-item',
          onClick: selectOptionValue.bind(null, option.value),
        } as const)
    );

  return (
    <LabeledFormField disabled={disabled} label={label} required={required}>
      <Menu
        options={optionsAsMenuOptions}
        renderTrigger={({ propsForTrigger }) => (
          <Box as="button" styles={tokens.inputStyles} {...propsForTrigger}>
            {!multiple && !!selectedOptions.length ? (
              selectedOptions[0].label
            ) : (
              <>&nbsp;</>
            )}
          </Box>
        )}
      />

      {selectedOptions.map((selectedOption) => (
        <Box
          as="input"
          key={selectedOption.value}
          type="hidden"
          value={selectedOption.value}
        />
      ))}
    </LabeledFormField>
  );
};

const docs: DocumentationPageDescriptor = {
  title: 'Form',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => <FormDemo />,
      highlightLines: [],
    },
  ],
};

export default docs;
