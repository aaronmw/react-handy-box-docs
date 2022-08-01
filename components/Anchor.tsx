import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import Link from 'next/link';
import { forwardRef, Ref } from 'react';

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

const Anchor = forwardRef(
  (
    { children, href, variant = 'normal', ...props }: AnchorProps,
    ref: Ref<HTMLAnchorElement>
  ) => (
    <Link href={href} as={href} passHref={true} shallow={true}>
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

Anchor.displayName = 'Anchor';

export { Anchor };
