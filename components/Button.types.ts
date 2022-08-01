import { BoxProps } from '@/components/Box.types';
import { FormFieldClickHandler } from '@/components/Form.types';
import { buttonStyles } from '@/tokens/buttonStyles';
import { MouseEventHandler } from 'react';

export type ButtonType = keyof typeof buttonStyles;

export type ButtonProps = {
  disabled?: boolean;
  stopClickPropagation?: boolean;
  variant?: keyof typeof buttonStyles;
  onClick?: MouseEventHandler | FormFieldClickHandler;
};

export type ButtonComponentProps<
  ButtonOrAnchorTag extends 'a' | 'button' = 'button'
> = Omit<BoxProps<ButtonOrAnchorTag>, 'disabled' | 'ref' | 'onClick'> &
  ButtonProps;
