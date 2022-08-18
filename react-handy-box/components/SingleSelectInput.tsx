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
import { MenuItem } from '@/react-handy-box/components/Menu.types';
import { inputStyles } from '@/tokens/inputStyles';
import { forwardRef, MouseEvent, Ref } from 'react';

type SingleSelectInputProps<T extends BaseOptionShape> = Omit<
  BoxProps<'div'>,
  'children' | 'ref'
> &
  Omit<
    AbstractMultiSelectInputProps<T, false>,
    'isMultiValue' | 'renderOptions'
  >;

const SingleSelectInput = forwardRef(
  <T extends BaseOptionShape>(
    { placeholder = 'Select...', ...otherProps }: SingleSelectInputProps<T>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <AbstractMultiSelectInput
      isMultiValue={false}
      ref={ref}
      renderOptions={({ options }) => {
        const selectedOption = options.find((option) => option.isSelected);
        const unselectedOptions = options.filter(
          (option) => !option.isSelected
        );

        const optionsAsMenuItems = unselectedOptions.map(
          ({ option, propsForOption }) =>
            ({
              label: option.label,
              type: 'menu-item',
              onClick: propsForOption.onClick,
            } as MenuItem)
        );

        const handleClickClearSelection = (
          event: MouseEvent<HTMLButtonElement>
        ) => {
          event.stopPropagation();
          event.preventDefault();

          selectedOption?.propsForOption.onClick?.(event);
        };

        return (
          <Box rowGap="xtight">
            <Menu
              options={optionsAsMenuItems}
              renderTrigger={({ propsForTrigger }) => (
                <Box
                  {...(inputStyles as BoxProps<'div'>)}
                  alignItems="center"
                  columnGap="tight"
                  display="flex"
                  justifyContent="space-between"
                  paddingY="xxtight"
                  ref={propsForTrigger.ref as Ref<HTMLDivElement>}
                  tabIndex={0}
                  whiteSpace="nowrap"
                  onClick={propsForTrigger.onClick}
                >
                  <Box color={!selectedOption ? 'textFaded' : undefined}>
                    {selectedOption?.option.label ?? placeholder}
                  </Box>

                  <Box columnGap="xtight">
                    {selectedOption && (
                      <Button
                        variant="iconOnly"
                        onClick={handleClickClearSelection}
                      >
                        <Icon name="xmark" />
                      </Button>
                    )}

                    <Button variant="iconOnly">
                      <Icon name="chevron-down" />
                    </Button>
                  </Box>
                </Box>
              )}
            />
          </Box>
        );
      }}
      {...otherProps}
    />
  )
);

SingleSelectInput.displayName = 'SingleSelectInput';

export { SingleSelectInput };
