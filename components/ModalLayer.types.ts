import { BoxProps } from '@/components/Box.types';
import { FormProps } from '@/components/Form.types';
import { variantPropMap } from '@/components/ModalWindow';
import {
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  Ref,
  RefObject,
} from 'react';

export type ModalLayerType =
  | 'dialog'
  | 'menu'
  | 'popover'
  | 'tooltip'
  | 'window';

export type ModalLayerStackEntry = {
  element: HTMLElement;
  setIsOpen: (isOpen: boolean) => void;
  type: ModalLayerType;
};

export type ModalLayerStack = Array<ModalLayerStackEntry>;

export type ModalLayerContextObject = {
  modalLayerStack: MutableRefObject<ModalLayerStack>;
};

export type ModalLayerEventHandler = (
  renderProps?: ModalLayerRenderProps
) => void;

export type ModalLayerRenderFunction = (
  renderProps: ModalLayerRenderProps
) => JSX.Element | ReactNode;

export type ModalLayerRenderProps = {
  closeModal: () => void;
  isOpen: boolean;
  modalLayerElementRef?: RefObject<HTMLDivElement>;
  setIsOpen: (newIsOpen: boolean) => void;
  triggerElementRef?: RefObject<HTMLButtonElement>;
  propsForTrigger: {
    ref: Ref<HTMLButtonElement>;
    onClick: MouseEventHandler;
  };
};

type BasicModalLayerProps = Omit<BoxProps, 'children' | 'ref' | 'type'> & {
  children: ReactNode | ModalLayerRenderFunction;
  disableBackdropClick?: boolean;
  disableFocusTrap?: boolean;
  propsForBackdrop?: Omit<BoxProps, 'ref'>;
  type: ModalLayerType;
  onBeforeClose?: ModalLayerEventHandler;
  onBeforeOpen?: ModalLayerEventHandler;
  onClose?: ModalLayerEventHandler;
  onOpen?: ModalLayerEventHandler;
};

type RemoteControlledModalLayerProps = {
  initialIsOpen?: never;
  isOpen: boolean;
  renderTrigger?: never;
};

type TriggerControlledModalLayerProps = {
  initialIsOpen?: boolean;
  isOpen?: never;
  renderTrigger?: ModalLayerRenderFunction;
};

export type ModalLayerProps = BasicModalLayerProps &
  (RemoteControlledModalLayerProps | TriggerControlledModalLayerProps);

export type ModalWindowProps = Omit<ModalLayerProps, 'type'> & {
  propsForForm?:
    | Omit<FormProps, 'children'>
    | ((
        renderProps: ModalLayerRenderProps
      ) => Omit<FormProps, 'children' | 'ref'>);
  renderFooter?: ModalLayerRenderFunction;
  renderHeader?: ModalLayerRenderFunction;
  type?: ModalLayerType;
  variant?: keyof typeof variantPropMap;
};
