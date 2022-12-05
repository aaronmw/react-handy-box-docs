import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { FormFieldClickHandler } from '@/react-handy-box/components/Form.types';
import { buttonStyles } from '@/tokens/buttonStyles';
import { MouseEvent } from 'react';

export type ButtonType = keyof typeof buttonStyles;

export type ButtonProps = {
  stopClickPropagation?: boolean;
  variant?: keyof typeof buttonStyles;
  onClick?: ((event: MouseEvent) => void) | FormFieldClickHandler;
};

export type ButtonComponentProps<T extends 'a' | 'button'> = Omit<
  BoxPropsWithoutRef<T>,
  keyof ButtonProps
> &
  ButtonProps;
