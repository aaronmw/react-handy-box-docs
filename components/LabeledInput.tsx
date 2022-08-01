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

type LabeledInputComponentProps = Omit<BoxProps<'label'>, 'ref'> &
  LabeledInputProps;

const baseLabelProps: Omit<BoxProps<'label'>, 'ref'> = {
  display: 'block',
  flexGrow: 1,
  flexShrink: 1,
};

const labelLocationPropMap: {
  [key in 'above' | 'left' | 'hidden']: {
    container?: Omit<BoxProps<'label'>, 'ref'>;
    label?: Omit<BoxProps<'span'>, 'ref' | 'style'>;
  };
} = {
  above: {
    container: {
      display: 'flex',
      rowGap: 'xtight',
      width: '100%',
    },
  },
  hidden: {
    label: {
      display: 'none',
    },
  },
  left: {
    container: {
      alignItems: 'baseline',
      columnGap: 'tight',
      display: 'flex',
    },
    label: {
      textAlign: 'right',
      whiteSpace: 'nowrap',
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
      labelLocation = 'above',
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

LabeledInput.displayName = 'LabeledInput';

export { LabeledInput };
