import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import Link from 'next/link';

export type AnchorProps = Omit<BoxPropsWithoutRef<'a'>, 'href'> & {
  href: string;
  variant?: keyof typeof variantPropMap;
};

const variantPropMap = {
  bare: {},
  normal: {
    color: 'link',
    fontWeight: 'bold',
    textDecoration: 'underline',
    stylesOnHover: {
      color: 'link--hovered',
    },
  },
  subtle: {
    color: 'text',
    fontWeight: 'bold',
    textDecoration: 'underline',
    stylesOnHover: {
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
        ...(variantPropMap[variant] as BoxPropsWithoutRef<'a'>['styles']),
        ...styles,
      }}
      {...otherProps}
    >
      {children}
    </Box>
  </Link>
);

export { Anchor };
