import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Icon } from '@/components/Icon';
import {
  ChildMenu,
  DividingLine as DevidingLineType,
  GroupLabel as GroupLabelType,
  GroupLabel as MenuGroupLabelType,
  MenuItem as MenuItemType,
  MenuProps,
} from '@/components/Menu.types';
import { Popover } from '@/components/Popover';
import {
  PopoverRenderFunction,
  PopoverRenderProps,
} from '@/components/Popover.types';
import { KeyMap, useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/hooks/useMultipleRefs';
import { whiteSpacesAsCSSVariables } from '@/tokens/whiteSpaces';
import {
  forwardRef,
  MouseEvent,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const Menu = forwardRef(
  (
    {
      options,
      renderTrigger,
      onBeforeClose,
      onBeforeOpen,
      onClose,
      onOpen,
      ...otherProps
    }: MenuProps,
    outerRef: Ref<HTMLElement>
  ): JSX.Element => {
    const hoistedPopoverRenderPropsRef = useRef<PopoverRenderProps | null>(
      null
    );
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const [menuElementRef, setMenuElementRef] = useState<HTMLElement | null>(
      null
    );
    const multipleRefs = useMultipleRefs(outerRef, setMenuElementRef);

    useEffect(() => {
      const triggerElement =
        hoistedPopoverRenderPropsRef?.current?.triggerElementRef?.current;
      const currentTriggerWidth = triggerElement?.clientWidth ?? 0;

      if (triggerElement && currentTriggerWidth !== triggerWidth) {
        setTriggerWidth(currentTriggerWidth);
      }
    }, [options, triggerWidth]);

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

    const renderedMenuOptions: PopoverRenderFunction = (popoverRenderProps) => {
      const hasIcons = options.some((option) => 'icon' in option);

      hoistedPopoverRenderPropsRef.current = popoverRenderProps;

      return options.length === 0 ? (
        <Box
          color="textFaded"
          fontSize="small"
          textAlign="center"
          onClick={popoverRenderProps.closeModal}
        >
          No options
        </Box>
      ) : (
        options.map((option, optionIndex) => {
          switch (option.type) {
            case 'menu-item': {
              const { icon, label, type, onClick, ...otherOptionProps } =
                option as MenuItemType;
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
                option as ChildMenu;

              const childMenuOptions = options.map((subOption) =>
                subOption.type === 'menu-item'
                  ? {
                      ...subOption,
                      onClick: (event: MouseEvent) => {
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
                        <Box columnGap="tight" justifyContent="space-between">
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
                option as GroupLabelType;

              return (
                <GroupLabel
                  {...otherOptionProps}
                  key={optionIndex}
                  label={label}
                />
              );
            }

            case 'dividing-line': {
              const { type, ...otherOptionProps } = option as DevidingLineType;

              return <DividingLine {...otherOptionProps} key={optionIndex} />;
            }
          }
        })
      );
    };

    return (
      <Popover
        borderRadius="small"
        flexDirection="column"
        maxHeight={`calc(100vh - ${whiteSpacesAsCSSVariables.normal} * 2)`}
        minWidth={200}
        maxWidth={`calc(100vw - ${whiteSpacesAsCSSVariables.normal} * 2)`}
        overflowY="auto"
        padding="xtight"
        ref={multipleRefs}
        renderTrigger={renderTrigger}
        role="menu"
        transitionDuration="short"
        transitionProperty="opacity"
        type="menu"
        width={triggerWidth <= 200 ? undefined : triggerWidth}
        onBeforeClose={onBeforeClose}
        onBeforeOpen={onBeforeOpen}
        onClose={onClose}
        onOpen={onOpen}
        {...otherProps}
      >
        {renderedMenuOptions}
      </Popover>
    );
  }
);

Menu.displayName = 'Menu';

type DividingLineProps = Omit<BoxProps, 'ref'>;

const DividingLine = ({ ...otherProps }: DividingLineProps) => (
  <Box marginY="xtight" borderBottom="hairline" {...otherProps} />
);

type GroupLabelProps = Omit<BoxProps, 'ref'> & Omit<MenuGroupLabelType, 'type'>;

const GroupLabel = ({ label, ...otherProps }: GroupLabelProps) => (
  <Box
    color="textFaded"
    fontSize="small"
    paddingBottom="xtight"
    paddingTop="tight"
    paddingX="xtight"
    textTransform="uppercase"
    {...otherProps}
  >
    {label}
  </Box>
);

type MenuItemProps = Omit<BoxProps<'button'>, 'ref'> &
  Omit<MenuItemType, 'type'> & {
    hasIcons?: boolean;
  };

const MenuItem = forwardRef(
  (
    { hasIcons, icon, label, onClick, ...otherProps }: MenuItemProps,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => {
    const handleClick = (e: MouseEvent) => onClick?.(e);

    return (
      <Box
        as="button"
        borderRadius="small"
        columnGap="tight"
        cursor="pointer"
        padding="xtight"
        propsOnFocus={{
          boxShadow: 'focusRing',
          zIndex: '1--stickyElements',
        }}
        propsOnHover={{
          backgroundColor: 'selected',
        }}
        ref={ref}
        whiteSpace="nowrap"
        onClick={handleClick}
        {...otherProps}
      >
        {hasIcons && (
          <Icon
            name={icon ?? 'arrow-right'}
            visibility={icon ? 'visible' : 'hidden'}
          />
        )}
        {label}
      </Box>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export { Menu };
