import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import Link from 'next/link';

export type AnchorProps = Omit<BoxProps<'a'>, 'href'> & {
  href: string;
  variant?: keyof typeof variantPropMap;
};

const variantPropMap = {
  bare: {},
  normal: {
    color: 'link',
    fontWeight: 'bold',
    textDecoration: 'underline',
    propsOnHover: {
      color: 'link--hovered',
    },
  },
  subtle: {
    color: 'text',
    fontWeight: 'bold',
    textDecoration: 'underline',
    propsOnHover: {
      color: 'link--hovered',
    },
  },
};

const Anchor = ({
  children,
  href,
  styles,
  variant = 'normal',
  ...otherProps
}: AnchorProps) => (
  <Link href={href} as={href} passHref={true} shallow={true}>
    <Box
      as="a"
      cursor="pointer"
      styles={{
        cursor: 'pointer',
        ...(variantPropMap[variant] as BoxProps<'a'>['styles']),
        ...styles,
      }}
      {...otherProps}
    >
      {children}
    </Box>
  </Link>
);

export { Anchor };
