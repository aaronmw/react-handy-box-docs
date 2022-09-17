import {
  BoxPropsWithoutRef,
  StyleProps,
} from '@/react-handy-box/components/Box.types';
import { IconName } from '@/react-handy-box/components/Icon.types';
import { PopoverProps } from '@/react-handy-box/components/Popover.types';
import { ReactNode } from 'react';

export type MenuItemProps = {
  DividingLine: BoxPropsWithoutRef & {
    type: 'dividing-line';
  };

  GroupLabel: BoxPropsWithoutRef & {
    type: 'group-label';
    label: ReactNode;
  };

  MenuItem: Omit<BoxPropsWithoutRef<'button'>, 'type'> & {
    icon?: IconName;
    label: ReactNode;
    type: 'menu-item';
  };

  MenuItemWithChildren: Omit<BoxPropsWithoutRef<'button'>, 'type'> & {
    icon?: IconName;
    label: ReactNode;
    options: Array<MenuItemProps[keyof MenuItemProps]>;
    type: 'child-menu';
  };
};

export type MenuProps = Omit<PopoverProps, 'children' | 'type'> & {
  options: Array<MenuItemProps[keyof MenuItemProps]>;
};
