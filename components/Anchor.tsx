import Link from 'next/link';
import { forwardRef, Ref } from 'react';
import { Box } from './Box';
import { BoxProps } from './Box.types';

type AnchorProps = BoxProps<'a'> & {
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
    textDecoration: 'none',
    propsOnHover: {
      color: 'link--hovered',
    },
  },
};

// eslint-disable-next-line react/display-name
const Anchor = forwardRef(
  (
    { children, href, variant = 'normal', ...props }: AnchorProps,
    ref: Ref<HTMLAnchorElement>
  ) => (
    <Link href={href} passHref={true} scroll={false}>
      <Box
        as="a"
        cursor="pointer"
        ref={ref}
        {...(variantPropMap[variant] as AnchorProps)}
        {...props}
      >
        {children}
      </Box>
    </Link>
  )
);

export { Anchor };
