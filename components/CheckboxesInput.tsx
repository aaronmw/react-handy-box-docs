import {
  AbstractMultiSelectInput,
  AbstractMultiSelectInputProps,
  BaseOptionShape,
} from "@/components/AbstractMultiSelectInput";
import { Box } from "@/components/Box";
import { BoxProps } from "@/components/Box.types";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { IconName } from "@/components/Icon.types";
import { forwardRef, MouseEvent, Ref } from "react";

type CheckboxesOrRadioInputProps<
  T extends BaseOptionShape,
  IsMultiValue extends boolean
> = Omit<BoxProps<"div">, "children" | "ref"> &
  Omit<AbstractMultiSelectInputProps<T, IsMultiValue>, "renderOptions"> & {
    iconWhenSelected: IconName;
    iconWhenNotSelected: IconName;
  };

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
        <Box rowGap="xtight">
          <Box columnGap="xtight" flexWrap="wrap">
            {options.map(({ option, propsForOption, isSelected }) => (
              <Button
                columnGap="xtight"
                cursor="pointer"
                key={option.value}
                variant="bare"
                onBlur={propsForOption.onBlur}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  event.stopPropagation();
                  propsForOption.onClick?.(event);
                }}
              >
                <Icon
                  color={isSelected ? "brand" : "textFaded"}
                  name={isSelected ? iconWhenSelected : iconWhenNotSelected}
                  variant={isSelected ? "solid" : undefined}
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

CheckboxesOrRadioInput.displayName = "CheckboxesOrRadiosInput";

const CheckboxesInput = forwardRef(
  <T extends BaseOptionShape>(
    {
      ...otherProps
    }: Omit<
      CheckboxesOrRadioInputProps<T, true>,
      "isMultiValue" | "iconWhenNotSelected" | "iconWhenSelected"
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

CheckboxesInput.displayName = "CheckboxesInput";

const RadioInput = forwardRef(
  <T extends BaseOptionShape>(
    {
      ...otherProps
    }: Omit<
      CheckboxesOrRadioInputProps<T, false>,
      "isMultiValue" | "iconWhenNotSelected" | "iconWhenSelected"
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

RadioInput.displayName = "RadioInput";

export { CheckboxesInput, RadioInput };
