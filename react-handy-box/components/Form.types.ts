import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { LabeledInputProps } from '@/react-handy-box/components/LabeledInput';
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  RefObject,
} from 'react';

export type CommonFormInputProps = {
  description?: ReactNode;
  disabled?: boolean;
  isRequired?: boolean;
  label: ReactNode;
  labelLocation?: 'above' | 'left' | 'hidden';
  propsForLabel?: Partial<LabeledInputProps>;
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

export type FormFieldBlurHandler = (
  event?: FormEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldChangeHandler = (
  event?: ChangeEvent<any>,
  formContext?: FormContextObject
) => void;

export type FormFieldClickHandler = (
  event?: MouseEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldDescriptor = {
  disabled?: boolean;
  isMultiValue?: boolean;
  isRequired?: boolean;
  ref?: RefObject<unknown> | null;
  name: string;
  onBlur?: FormFieldBlurHandler;
  onChange?: FormFieldChangeHandler;
  onRead?: FormFieldReadHandler;
  onReset?: FormFieldResetHandler;
  onValidate?: FormFieldValidationHandler;
};

export type FormFieldFocusHandler = (
  event?: FocusEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldReadHandler = (
  valueOrValues: FormDataEntryValue | Array<FormDataEntryValue>,
  formContext?: FormContextObject
) => unknown | Array<unknown>;

export type FormFieldRegistry = Record<string, FormFieldRegistryEntry>;

export type FormFieldRegistryEntry = Required<FormFieldDescriptor>;

export type FormFieldResetHandler = (formContext?: FormContextObject) => void;

export type FormFieldValidationHandler = (
  valueOrValues: unknown | Array<unknown>,
  formContext?: FormContextObject
) => true | ReactNode;

export type FormProps = Omit<BoxPropsWithoutRef<'form'>, 'onSubmit'> & {
  onDirtyStateChange?: (isStateDirty: boolean) => void;
  onSubmit?: (
    event: FormEvent<HTMLFormElement>,
    formContext?: FormContextObject
  ) => void | Promise<void>;
  onValidate?: FormFieldValidationHandler;
};
