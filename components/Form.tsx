import mapValues from 'lodash/mapValues';
import {
  ChangeEvent,
  createContext,
  FocusEvent,
  FormEvent,
  FormEventHandler,
  forwardRef,
  ReactNode,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useMultipleRefs from '../hooks/useMultipleRefs';
import { Box } from './Box';
import { BoxProps } from './Box.types';
import { LabeledInputProps } from './LabeledInput';

export type CommonFormInputProps = {
  description?: ReactNode;
  isRequired?: boolean;
  label: ReactNode;
  labelLocation?: 'above' | 'left' | 'hidden';
  labelProps?: Partial<LabeledInputProps>;
  name: string;
  onChange?: FormFieldChangeHandler;
  onFocus?: FormFieldFocusHandler;
  onRead?: FormFieldReadHandler;
  onReset?: FormFieldResetHandler;
  onValidate?: FormFieldValidationHandler;
};

export type FormContextObject = {
  getFieldValues: () => Record<string, unknown>;
  registerFormField: (fieldRegistryEntry: FormFieldRegistryEntry) => void;
  resetField: (fieldName: string) => void;
  resetForm: () => void;
  setFieldValue: (fieldName: string, value: unknown) => void;
  setIsDirty: (newIsDirty: boolean) => void;
};

type FormFieldBlurHandler = (
  event?: FormEvent,
  formContext?: FormContextObject
) => void;

type FormFieldChangeHandler = (
  event?: ChangeEvent<any>,
  formContext?: FormContextObject
) => void;

type FormFieldDescriptor = {
  isMultiValue?: boolean;
  isRequired?: boolean;
  ref: { current?: unknown };
  name: string;
  onBlur?: FormFieldBlurHandler;
  onChange?: FormFieldChangeHandler;
  onFocus?: FormFieldFocusHandler;
  onRead?: FormFieldReadHandler;
  onReset?: FormFieldResetHandler;
  onValidate?: FormFieldValidationHandler;
};

type FormFieldFocusHandler = (
  event?: FocusEvent<any>,
  formContext?: FormContextObject
) => void;

type FormFieldReadHandler = (
  valueOrValues: FormDataEntryValue | Array<FormDataEntryValue>,
  formContext?: FormContextObject
) => unknown | Array<unknown>;

type FormFieldRegistry = Record<string, FormFieldRegistryEntry>;

type FormFieldRegistryEntry = Required<FormFieldDescriptor>;

type FormFieldResetHandler = (formContext?: FormContextObject) => void;

type FormFieldValidationHandler = (
  valueOrValues: unknown | Array<unknown>,
  formContext?: FormContextObject
) => true | ReactNode;

type FormProps = Omit<BoxProps<'form'>, 'onSubmit'> & {
  onDirtyStateChange?: (isStateDirty: boolean) => void;
  onSubmit?: (
    event: FormEvent<HTMLFormElement>,
    formContext: FormContextObject
  ) => void | Promise<void>;
  onValidate?: FormFieldValidationHandler;
};

const emptyFormContext: FormContextObject = {
  getFieldValues: () => ({}),
  registerFormField: () => null,
  resetField: () => null,
  resetForm: () => null,
  setFieldValue: () => null,
  setIsDirty: () => null,
};

const FormContext = createContext<FormContextObject>(emptyFormContext);

export const useFormField = (fieldDescriptor: FormFieldDescriptor) => {
  const formContext = useContext(FormContext);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ReactNode>();

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    []
  );

  const getFieldValue = () => {
    const fieldValues = formContext.getFieldValues();
    return fieldValues[fieldDescriptor.name];
  };

  const formFieldRegistryEntry: FormFieldRegistryEntry = {
    isMultiValue: fieldDescriptor.isMultiValue ?? false,
    isRequired: fieldDescriptor.isRequired ?? false,
    name: fieldDescriptor.name,
    ref: fieldDescriptor.ref,
    onBlur: () => {
      formFieldRegistryEntry.onValidate(getFieldValue());
      setTouched(true);
    },
    onChange: (event) => {
      fieldDescriptor.onChange?.(event, formContext);

      if (focused) {
        formContext.setIsDirty(true);

        // Allow the field to re-render before validating
        timer.current = setTimeout(() => {
          formFieldRegistryEntry.onValidate(getFieldValue());
        }, 1);
      }
    },
    onFocus: () => {
      setFocused(true);
    },
    onRead: (fieldValue) =>
      fieldDescriptor.onRead?.(fieldValue, formContext) ?? fieldValue,
    onReset: () => {
      setFocused(false);
      setTouched(false);

      (fieldDescriptor.ref.current as HTMLFormElement).form?.reset();

      fieldDescriptor?.onReset?.(formContext);
    },
    onValidate: (valueOrValues: unknown | Array<unknown>) => {
      if (
        fieldDescriptor.isRequired &&
        ((fieldDescriptor.isMultiValue &&
          !(valueOrValues as Array<unknown>).length) ||
          !valueOrValues)
      ) {
        const newErrorMessage = 'Oops. This field is required!';

        setErrorMessage(newErrorMessage);

        return newErrorMessage;
      }

      const validationResult =
        fieldDescriptor.onValidate?.(valueOrValues, formContext) ?? true;

      setErrorMessage(validationResult !== true ? validationResult : undefined);

      return validationResult;
    },
  };

  formContext.registerFormField(formFieldRegistryEntry);

  return {
    inputProps: {
      name: formFieldRegistryEntry.name,
      onBlur: formFieldRegistryEntry.onBlur,
      onChange: formFieldRegistryEntry.onChange,
      onFocus: formFieldRegistryEntry.onFocus,
    },
    labelProps: {
      errorMessage,
      isRequired: formFieldRegistryEntry.isRequired,
    },
    touched,
  };
};

// eslint-disable-next-line react/display-name
const Form = forwardRef(
  (
    { children, onDirtyStateChange, onSubmit, ...props }: FormProps,
    outerRef: Ref<HTMLFormElement>
  ): JSX.Element => {
    const [isDirty, setIsDirty] = useState(false);
    const formElementRef = useRef<HTMLFormElement>();
    const multipleRefs = useMultipleRefs(formElementRef, outerRef);
    const formFieldRegistryRef = useRef<FormFieldRegistry>({});

    useEffect(() => {
      onDirtyStateChange?.(isDirty);
    }, [isDirty, onDirtyStateChange]);

    const getFieldValues = () => {
      const formElement = formElementRef.current;
      const formFieldRegistry = formFieldRegistryRef.current;

      if (!formElement) {
        return {};
      }

      const formData = new FormData(formElement);

      const transformedData = mapValues(
        formFieldRegistry,
        (fieldDescriptor, fieldName) => {
          const fieldValueOrValues = fieldDescriptor.isMultiValue
            ? formData.getAll(fieldName) ?? []
            : formData.get(fieldName) ?? '';

          return (
            fieldDescriptor.onRead(fieldValueOrValues) ?? fieldValueOrValues
          );
        }
      );

      return transformedData;
    };

    const registerFormField = (
      formFieldRegistryEntry: FormFieldRegistryEntry
    ) => {
      if (formFieldRegistryEntry.name) {
        formFieldRegistryRef.current[formFieldRegistryEntry.name] =
          formFieldRegistryEntry;
      }
    };

    const handleReset = () => {
      const formElement = formElementRef.current;

      if (!formElement) {
        return;
      }

      const formFieldRegistry = formFieldRegistryRef.current;

      Object.keys(formFieldRegistry).forEach((fieldName) => {
        formFieldRegistry[fieldName].onReset();
      });

      setIsDirty(false);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();

      const fieldValues = getFieldValues();

      const formFieldRegistry = formFieldRegistryRef.current;

      let allFieldsPassValidation = true;

      Object.keys(formFieldRegistry).forEach((fieldName) => {
        const formFieldRegistryEntry = formFieldRegistry[fieldName];

        const validationResult = formFieldRegistryEntry.onValidate(
          fieldValues[fieldName],
          formContext
        );

        if (validationResult !== true) {
          allFieldsPassValidation = false;
        }
      });

      if (allFieldsPassValidation) {
        onSubmit?.(event, formContext);

        handleReset();
      }
    };

    const formContext: FormContextObject = {
      getFieldValues,
      registerFormField,
      resetField: () => null,
      resetForm: handleReset,
      setFieldValue: () => null,
      setIsDirty,
    };

    return (
      <FormContext.Provider value={formContext}>
        <Box
          as="form"
          ref={multipleRefs}
          onReset={handleReset}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}
        </Box>
      </FormContext.Provider>
    );
  }
);

export { Form };
