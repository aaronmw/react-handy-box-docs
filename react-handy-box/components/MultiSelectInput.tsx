import {
  AbstractMultiSelectInput,
  AbstractMultiSelectInputProps,
  BaseOptionShape,
} from '@/react-handy-box/components/AbstractMultiSelectInput';
import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Icon } from '@/react-handy-box/components/Icon';
import { Menu } from '@/react-handy-box/components/Menu';
import { MenuItemProps } from '@/react-handy-box/components/Menu.types';
import { inputStyles } from '@/tokens/inputStyles';
import { forwardRef, MouseEvent, ReactNode, Ref } from 'react';

type MultiSelectInputProps<T extends BaseOptionShape> = Omit<
  BoxProps,
  'children'
> &
  Omit<
    AbstractMultiSelectInputProps<T, true>,
    'isMultiValue' | 'renderOptions'
  >;

const MultiSelectInput = forwardRef(
  <T extends BaseOptionShape>(
    {
      disabled,
      placeholder = 'Select...',
      ...otherProps
    }: MultiSelectInputProps<T>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <AbstractMultiSelectInput
      disabled={disabled}
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
              type: 'menu-item',
              onClick: propsForOption.onClick,
            } as MenuItemProps['MenuItem'])
        );

        return (
          <Box
            styles={{
              rowGap: 'xtight',
            }}
          >
            <Menu
              options={optionsAsMenuItems}
              renderTrigger={({ propsForTrigger }) => (
                <Box
                  ref={propsForTrigger.ref as Ref<HTMLDivElement>}
                  tabIndex={0}
                  styles={{
                    alignItems: 'center',
                    columnGap: 'tight',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingY: 'xxtight',
                    whiteSpace: 'nowrap',
                    ...inputStyles,
                  }}
                  onClick={propsForTrigger.onClick}
                >
                  <Box
                    styles={{
                      color: 'textFaded',
                    }}
                  >
                    {placeholder}
                  </Box>

                  <Box styles={{ columnGap: 'xtight' }}>
                    <Button variant="iconOnly">
                      <Icon name="chevron-down" />
                    </Button>
                  </Box>
                </Box>
              )}
            />

            {!disabled && selectedOptions.length > 0 && (
              <Box
                styles={{
                  columnGap: 'xtight',
                  flexWrap: 'wrap',
                  rowGap: 'xtight',
                }}
              >
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
  )
);

MultiSelectInput.displayName = 'MultiSelectInput';

const PillButton = forwardRef(
  (
    {
      label,
      onClick,
      ...otherProps
    }: BoxProps<'button'> & {
      label: ReactNode;
    },
    ref: Ref<HTMLButtonElement>
  ) => (
    <Box
      as="button"
      ref={ref}
      styles={{
        backgroundColor: 'selected',
        borderRadius: 'small',
        cursor: 'pointer',
        paddingX: 'tight',
        paddingY: 'xtight',
        propsOnHover: {
          backgroundColor: 'selected',
          backgroundColorLightness: '+100',
        },
      }}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onClick?.(event);
      }}
      {...otherProps}
    >
      {label}
      <Icon name="xmark" />
    </Box>
  )
);

PillButton.displayName = 'PillButton';

export { MultiSelectInput };
