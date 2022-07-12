import { Box } from "@/components/Box";
import {
  FormContextObject,
  FormFieldDescriptor,
  FormFieldRegistry,
  FormFieldRegistryEntry,
  FormProps,
} from "@/components/Form.types";
import { useMultipleRefs } from "@/hooks/useMultipleRefs";
import mapValues from "lodash/mapValues";
import {
  createContext,
  FormEvent,
  forwardRef,
  ReactNode,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const emptyFormContext: FormContextObject = {
  getFieldValues: () => ({}),
  registerFormField: () => null,
  resetField: () => null,
  resetForm: () => null,
  setFieldValue: () => null,
  setIsDirty: () => null,
};

const FormContext = createContext<FormContextObject>(emptyFormContext);

const useFormField = (fieldDescriptor: FormFieldDescriptor) => {
  const formContext = useContext(FormContext);
  const timer = useRef<ReturnType<typeof setTimeout>>();
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
    ref: fieldDescriptor.ref ?? null,

    onBlur: () => {
      formFieldRegistryEntry.onValidate(getFieldValue());
      setTouched(true);
    },

    onChange: (event) => {
      fieldDescriptor.onChange?.(event, formContext);

      if (touched) {
        formContext.setIsDirty(true);

        // Allow the field to re-render before validating
        timer.current = setTimeout(() => {
          formFieldRegistryEntry.onValidate(getFieldValue());
        }, 1);
      }
    },

    onRead: (fieldValue) =>
      fieldDescriptor.onRead?.(fieldValue, formContext) ?? fieldValue,

    onReset: () => {
      setTouched(false);

      setErrorMessage(null);

      (fieldDescriptor.ref?.current as HTMLFormElement)?.form?.reset();

      fieldDescriptor?.onReset?.(formContext);
    },

    onValidate: (valueOrValues: unknown | Array<unknown>) => {
      if (
        fieldDescriptor.isRequired &&
        ((fieldDescriptor.isMultiValue &&
          !(valueOrValues as Array<unknown>).length) ||
          !valueOrValues)
      ) {
        const newErrorMessage = "Oops. This field is required!";

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
    propsForInput: {
      name: formFieldRegistryEntry.name,
      onBlur: formFieldRegistryEntry.onBlur,
      onChange: formFieldRegistryEntry.onChange,
    },
    propsForLabel: {
      errorMessage,
      isRequired: formFieldRegistryEntry.isRequired,
    },
    touched,
  };
};

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
            : formData.get(fieldName) ?? "";

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

Form.displayName = "Form";

export { Form, FormContext, useFormField };
