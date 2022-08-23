import {
  AbstractMultiSelectInput,
  AbstractMultiSelectInputProps,
  BaseOptionShape,
} from '@/react-handy-box/components/AbstractMultiSelectInput';
import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Icon } from '@/react-handy-box/components/Icon';
import { IconName } from '@/react-handy-box/components/Icon.types';
import { forwardRef, MouseEvent, Ref } from 'react';
import rehypeFilter from 'react-markdown/lib/rehype-filter';

type CheckboxesOrRadioInputProps<
  T extends BaseOptionShape,
  IsMultiValue extends boolean
> = Omit<BoxProps, 'children' | 'ref'> &
  Omit<AbstractMultiSelectInputProps<T, IsMultiValue>, 'renderOptions'> & {
    iconWhenSelected: IconName;
    iconWhenNotSelected: IconName;
  };

type CheckboxOrRadioProps = BoxProps<'span'> & {
  isSelected?: boolean;
};

const Checkbox = forwardRef(
  (
    { isSelected = false, styles, ...otherProps }: CheckboxOrRadioProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <Icon
      name={isSelected ? 'square-check' : 'square'}
      ref={ref}
      styles={{
        color: isSelected ? 'brand' : 'textFaded',
        ...styles,
      }}
      variant={isSelected ? 'solid' : undefined}
      {...otherProps}
    />
  )
);

Checkbox.displayName = 'Checkbox';

const Radio = forwardRef(
  (
    { isSelected = false, styles, ...otherProps }: CheckboxOrRadioProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <Icon
      name={isSelected ? 'circle-dot' : 'circle'}
      ref={ref}
      styles={{
        color: isSelected ? 'brand' : 'textFaded',
        ...styles,
      }}
      variant={isSelected ? 'solid' : undefined}
      {...otherProps}
    />
  )
);

Radio.displayName = 'Radio';

const CheckboxesOrRadioInput = forwardRef(
  <T extends BaseOptionShape, IsMultiValue extends boolean>(
    {
      iconWhenSelected,
      iconWhenNotSelected,
      isMultiValue,
      ...otherProps
    }: CheckboxesOrRadioInputProps<T, IsMultiValue>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <AbstractMultiSelectInput
      isMultiValue={isMultiValue}
      ref={ref}
      renderOptions={({ options }) => (
        <Box styles={{ rowGap: 'xtight' }}>
          <Box styles={{ columnGap: 'xtight', flexWrap: 'wrap' }}>
            {options.map(({ option, propsForOption, isSelected }) => (
              <Button
                key={option.value}
                styles={{
                  columnGap: 'xtight',
                  cursor: 'pointer',
                }}
                variant="bare"
                onBlur={propsForOption.onBlur}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  event.stopPropagation();
                  propsForOption.onClick?.(event);
                }}
              >
                <Icon
                  name={isSelected ? iconWhenSelected : iconWhenNotSelected}
                  styles={{
                    color: isSelected ? 'brand' : 'textFaded',
                  }}
                  variant={isSelected ? 'solid' : undefined}
                />
                {option.label}
              </Button>
            ))}
          </Box>
        </Box>
      )}
      {...otherProps}
    />
  )
);

CheckboxesOrRadioInput.displayName = 'CheckboxesOrRadioInput';

const CheckboxesInput = forwardRef(
  <T extends BaseOptionShape>(
    {
      ...otherProps
    }: Omit<
      CheckboxesOrRadioInputProps<T, true>,
      'isMultiValue' | 'iconWhenNotSelected' | 'iconWhenSelected'
    >,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <CheckboxesOrRadioInput
      iconWhenNotSelected="square"
      iconWhenSelected="square-check"
      isMultiValue={true}
      ref={ref}
      {...otherProps}
    />
  )
);

CheckboxesInput.displayName = 'CheckboxesInput';

const RadioInput = forwardRef(
  <T extends BaseOptionShape>(
    {
      ...otherProps
    }: Omit<
      CheckboxesOrRadioInputProps<T, false>,
      'isMultiValue' | 'iconWhenNotSelected' | 'iconWhenSelected'
    >,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <CheckboxesOrRadioInput
      iconWhenNotSelected="circle"
      iconWhenSelected="circle-dot"
      isMultiValue={false}
      ref={ref}
      {...otherProps}
    />
  )
);

RadioInput.displayName = 'RadioInput';

export { Checkbox, CheckboxesInput, Radio, RadioInput };
