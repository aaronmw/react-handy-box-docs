import {
  AbstractMultiSelectInput,
  AbstractMultiSelectInputProps,
  BaseOptionShape,
} from "@/components/AbstractMultiSelectInput";
import { Box } from "@/components/Box";
import { BoxProps } from "@/components/Box.types";
import { Icon } from "@/components/Icon";
import { Menu } from "@/components/Menu";
import { MenuItem } from "@/components/Menu.types";
import { TextInput } from "@/components/TextInput";
import { forwardRef, ReactNode, Ref } from "react";

type MultiSelectInputProps<T extends BaseOptionShape> = Omit<
  BoxProps<"div">,
  "children" | "ref"
> &
  Omit<
    AbstractMultiSelectInputProps<T, true>,
    "isMultiValue" | "renderOptions"
  >;

const MultiSelectInput = forwardRef(
  <T extends BaseOptionShape>(
    { placeholder = "Select...", ...otherProps }: MultiSelectInputProps<T>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    return (
      <AbstractMultiSelectInput
        isMultiValue={true}
        ref={ref}
        renderOptions={({ options }) => {
          const selectedOptions = options.filter((option) => option.isSelected);
          const unselectedOptions = options.filter(
            (option) => !option.isSelected
          );

          const optionsAsMenuItems = unselectedOptions.map(
            ({ option, propsForOption }) =>
              ({
                label: option.label,
                type: "menu-item",
                onClick: propsForOption.onClick,
              } as MenuItem)
          );

          return (
            <Box rowGap="xtight">
              <Menu
                options={optionsAsMenuItems}
                renderTrigger={({ propsForTrigger }) => (
                  <TextInput
                    name=""
                    label="Option Filter"
                    labelLocation="hidden"
                    placeholder={placeholder}
                    {...(propsForTrigger as any)}
                  />
                )}
              />

              {selectedOptions.length > 0 && (
                <Box columnGap="xtight" flexWrap="wrap" rowGap="xtight">
                  {selectedOptions.map((selectedOption) => (
                    <PillButton
                      key={selectedOption.option.value}
                      label={selectedOption.option.label}
                      onClick={selectedOption.propsForOption.onClick}
                    />
                  ))}
                </Box>
              )}
            </Box>
          );
        }}
        {...otherProps}
      />
    );
  }
);

MultiSelectInput.displayName = "MultiSelectInput";

const PillButton = ({
  label,
  onClick,
  ...otherProps
}: BoxProps<"button"> & {
  label: ReactNode;
}) => (
  <Box
    as="button"
    backgroundColor="selected"
    borderRadius="small"
    cursor="pointer"
    paddingX="xtight"
    paddingY="xxtight"
    propsOnHover={{
      backgroundColor: "selected",
      backgroundColorLightness: "+100",
    }}
    onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      onClick?.(event);
    }}
    {...otherProps}
  >
    {label}
    <Icon name="xmark" />
  </Box>
);

export { MultiSelectInput };
