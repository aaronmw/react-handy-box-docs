import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Text } from '@/components/Text';
import { forwardRef, ReactNode, Ref } from 'react';

export type LabeledInputProps = {
  errorMessage?: ReactNode;
  isRequired?: boolean;
  label: ReactNode;
  labelLocation?: 'above' | 'left' | 'hidden';
};

type LabeledInputComponentProps = BoxProps<'label'> & LabeledInputProps;

const baseLabelProps: BoxProps<'label'> = {
  flexGrow: 1,
  flexShrink: 1,
  propsOnFocus: {
    boxShadow: 'focusRing',
  },
};

const labelLocationPropMap: {
  [key in 'above' | 'left' | 'hidden']?: {
    container?: Omit<BoxProps<'label'>, 'ref'>;
    label?: Omit<BoxProps<'span'>, 'ref'>;
  };
} = {
  above: {
    container: {
      rowGap: 'tight',
      width: '100%',
    },
  },
  left: {
    container: {
      alignItems: 'baseline',
      border: 'hairline',
      borderColor: 'white',
      borderRadius: 'small',
      columnGap: 'tight',
      paddingX: 'tight',
      paddingY: 'xtight',
      propsOnHover: {
        border: 'hairline',
        borderColor: 'border',
      },
    },
    label: {
      textAlign: 'right',
      width: 50,
    },
  },
};

const LabeledInput = forwardRef(
  (
    {
      children,
      errorMessage,
      isRequired = false,
      label,
      labelLocation = 'left',
      ...props
    }: LabeledInputComponentProps,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <Box
      as="label"
      ref={ref}
      tabIndex={0}
      {...baseLabelProps}
      {...labelLocationPropMap[labelLocation]?.container}
      {...props}
    >
      {labelLocation !== 'hidden' && (
        <Text variant="label" {...labelLocationPropMap[labelLocation]?.label}>
          {label}
          {isRequired && (
            <>
              {' '}
              <Text color="red">*</Text>
            </>
          )}
        </Text>
      )}

      {children}

      {errorMessage && (
        <Box color="danger" fontSize="small">
          {errorMessage}
        </Box>
      )}
    </Box>
  )
);

export { LabeledInput };
