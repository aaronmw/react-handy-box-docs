import { BoxProps } from '@/react-handy-box/components/Box.types';
import { IconName } from '@/react-handy-box/components/Icon.types';
import { PopoverProps } from '@/react-handy-box/components/Popover.types';
import { MouseEvent, ReactNode } from 'react';

export type DividingLine = {
  type: 'dividing-line';
};

export type GroupLabel = {
  type: 'group-label';
  label: ReactNode;
};

export type MenuItem = {
  icon?: IconName;
  label: ReactNode;
  type: 'menu-item';
  onClick?: (event: MouseEvent) => void;
};

export type ChildMenu = {
  icon?: IconName;
  label: ReactNode;
  options: Array<AnyMenuItemType>;
  type: 'child-menu';
};

export type AnyMenuItemType = (
  | DividingLine
  | GroupLabel
  | MenuItem
  | ChildMenu
) & {
  propsForContainer?: Omit<BoxProps, 'ref'>;
};

export type MenuProps = Omit<PopoverProps, 'children' | 'type'> & {
  options: Array<AnyMenuItemType>;
};
