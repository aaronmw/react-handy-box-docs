import { IconName } from "@/components/Icon.types";
import { PopoverProps } from "@/components/Popover.types";
import { MouseEvent, ReactNode } from "react";

export type DividingLine = {
  type: "dividing-line";
};

export type GroupLabel = {
  type: "group-label";
  label: ReactNode;
};

export type MenuItem = {
  icon?: IconName;
  label: ReactNode;
  type: "menu-item";
  onClick?: (event: MouseEvent) => void;
};

export type ChildMenu = {
  icon?: IconName;
  label: ReactNode;
  options: Array<AnyMenuItemType>;
  type: "child-menu";
};

export type AnyMenuItemType = DividingLine | GroupLabel | MenuItem | ChildMenu;

export type MenuProps = Omit<PopoverProps, "children" | "type"> & {
  options: Array<AnyMenuItemType>;
};
