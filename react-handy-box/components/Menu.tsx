import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { Icon } from '@/react-handy-box/components/Icon';
import {
  MenuItemProps,
  MenuProps,
} from '@/react-handy-box/components/Menu.types';
import { Popover } from '@/react-handy-box/components/Popover';
import {
  PopoverEventHandler,
  PopoverRenderFunction,
  PopoverRenderProps,
} from '@/react-handy-box/components/Popover.types';
import {
  KeyMap,
  useKeyboardShortcuts,
} from '@/react-handy-box/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { whiteSpacesAsCSSVariables } from '@/tokens/whiteSpaces';
import {
  forwardRef,
  MouseEvent,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

const Menu = forwardRef(
  (
    { options, styles, ...otherProps }: MenuProps,
    ref: Ref<HTMLDivElement>
  ): JSX.Element => {
    const hoistedPopoverRenderPropsRef = useRef<PopoverRenderProps | null>(
      null
    );
    ``;
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const [menuElementRef, setMenuElementRef] = useState<HTMLElement | null>(
      null
    );
    const multipleRefs = useMultipleRefs(ref, setMenuElementRef);

    const memoizedKeyMap = useMemo<KeyMap>(
      () => ({
        left: () => {
          hoistedPopoverRenderPropsRef.current?.closeModal();
        },
        right: () => {
          (document.activeElement as HTMLElement).click?.();
        },
      }),
      []
    );

    useKeyboardShortcuts(memoizedKeyMap, menuElementRef);

    const menuOptionRenderer: PopoverRenderFunction = (popoverRenderProps) => {
      const hasIcons = options.some((option) => 'icon' in option);

      hoistedPopoverRenderPropsRef.current = popoverRenderProps;

      return options.length === 0 ? (
        <Box
          styles={{
            color: 'textFaded',
            fontSize: 'small',
            textAlign: 'center',
          }}
          onClick={popoverRenderProps.closeModal}
        >
          No options
        </Box>
      ) : (
        options.map((option, optionIndex) => {
          switch (option.type) {
            case 'menu-item': {
              const { icon, label, type, onClick, ...otherOptionProps } =
                option as MenuItemProps['MenuItem'];

              return (
                <MenuItem
                  {...otherOptionProps}
                  hasIcons={hasIcons}
                  icon={icon}
                  key={optionIndex}
                  label={label}
                  onClick={(event) => {
                    onClick?.(event);
                    popoverRenderProps.closeModal();
                  }}
                />
              );
            }

            case 'child-menu': {
              const { icon, label, options, type, ...otherOptionProps } =
                option as MenuItemProps['MenuItemWithChildren'];

              const childMenuOptions = options.map((subOption) =>
                subOption.type === 'menu-item'
                  ? {
                      ...subOption,
                      onClick: (event: MouseEvent<HTMLButtonElement>) => {
                        subOption.onClick?.(event);
                        popoverRenderProps.closeModal(); // <- close entire menu
                      },
                    }
                  : subOption
              );

              return (
                <Menu
                  key={optionIndex}
                  options={childMenuOptions}
                  popperPlacementOrder={['right-start', 'left-start']}
                  renderTrigger={({ propsForTrigger }) => (
                    <MenuItem
                      {...otherOptionProps}
                      hasIcons={hasIcons}
                      icon={icon}
                      label={
                        <Box
                          styles={{
                            columnGap: 'tight',
                            justifyContent: 'space-between',
                          }}
                        >
                          {label}
                          <Icon name="caret-right" variant="solid" />
                        </Box>
                      }
                      {...propsForTrigger}
                    />
                  )}
                />
              );
            }

            case 'group-label': {
              const { label, type, ...otherOptionProps } =
                option as MenuItemProps['GroupLabel'];

              return (
                <GroupLabel
                  {...otherOptionProps}
                  key={optionIndex}
                  label={label}
                />
              );
            }

            case 'dividing-line': {
              const { type, ...otherOptionProps } =
                option as MenuItemProps['DividingLine'];

              return <DividingLine {...otherOptionProps} key={optionIndex} />;
            }
          }
        })
      );
    };

    const sizeMenuToTriggerElement: PopoverEventHandler = useCallback(
      (renderProps) => {
        const triggerElement = renderProps?.triggerElementRef?.current;
        const currentTriggerWidth = triggerElement?.clientWidth ?? 0;

        if (triggerElement && currentTriggerWidth !== triggerWidth) {
          setTriggerWidth(currentTriggerWidth);
        }
      },
      [triggerWidth]
    );

    return (
      <Popover
        ref={multipleRefs}
        role="menu"
        styles={{
          borderRadius: 'small',
          flexDirection: 'column',
          maxHeight: `calc(100vh - ${whiteSpacesAsCSSVariables.normal} * 2)`,
          maxWidth: `calc(100vw - ${whiteSpacesAsCSSVariables.normal} * 2)`,
          minWidth: 200,
          overflowY: 'auto',
          padding: 'xtight',
          transitionDuration: 'short',
          transitionProperty: 'opacity',
          width: triggerWidth <= 200 ? undefined : triggerWidth,
          ...styles,
        }}
        type="menu"
        onBeforeOpen={sizeMenuToTriggerElement}
        {...otherProps}
      >
        {menuOptionRenderer}
      </Popover>
    );
  }
);

Menu.displayName = 'Menu';

type DividingLineComponentProps = BoxProps;

const DividingLine = forwardRef(
  (
    { styles, ...otherProps }: DividingLineComponentProps,
    ref: Ref<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      styles={{
        borderBottom: 'hairline',
        marginY: 'xtight',
        ...styles,
      }}
      {...otherProps}
    />
  )
);

DividingLine.displayName = 'DividingLine';

type GroupLabelComponentProps = BoxProps &
  Omit<MenuItemProps['GroupLabel'], 'type'>;

const GroupLabel = forwardRef(
  (
    { label, styles, ...otherProps }: GroupLabelComponentProps,
    ref: Ref<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      styles={{
        color: 'textFaded',
        fontSize: 'small',
        paddingBottom: 'xtight',
        paddingTop: 'tight',
        paddingX: 'xtight',
        textTransform: 'uppercase',
        ...styles,
      }}
      {...otherProps}
    >
      {label}
    </Box>
  )
);

GroupLabel.displayName = 'GroupLabel';

type MenuItemComponentProps = Omit<MenuItemProps['MenuItem'], 'type'> & {
  hasIcons?: boolean;
};

const MenuItem = forwardRef(
  (
    { hasIcons, icon, label, onClick, ...otherProps }: MenuItemComponentProps,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
      onClick?.(event);

    return (
      <Box
        as="button"
        ref={ref}
        styles={{
          borderRadius: 'small',
          columnGap: 'tight',
          cursor: 'pointer',
          padding: 'xtight',
          propsOnFocus: {
            boxShadow: 'focusRing',
            zIndex: '1--stickyElements',
          },
          propsOnHover: {
            backgroundColor: 'selected',
          },
          whiteSpace: 'nowrap',
        }}
        onClick={handleClick}
        {...otherProps}
      >
        {hasIcons && (
          <Icon
            name={icon ?? 'arrow-right'}
            styles={{
              visibility: icon ? 'visible' : 'hidden',
            }}
          />
        )}
        {label}
      </Box>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export { Menu };
