import { Anchor } from '@/components/Anchor';
import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Icon } from '@/components/Icon';
import { useLinkActivity } from '@/hooks/useLinkActivity';
import { forwardRef, Ref } from 'react';

type NavigationItem = {
  href: string;
  subSections?: Array<NavigationItem>;
  title: string;
  level?: number;
};

type NavigationTreeProps = Omit<BoxProps<'ul'>, 'children' | 'data' | 'ref'> & {
  data: Array<NavigationItem>;
  level?: number;
};

type NavigationItemProps = Omit<BoxProps<'li'>, 'children' | 'ref' | 'title'> &
  NavigationItem;

const NavigationItem = forwardRef(
  (
    { title, href, subSections, level = 0, ...otherProps }: NavigationItemProps,
    ref: Ref<HTMLLIElement>
  ): JSX.Element => {
    const { isActive } = useLinkActivity(href);

    return (
      <Box
        as="li"
        marginTop={level === 0 ? 'xtight' : undefined}
        ref={ref}
        {...otherProps}
      >
        <Anchor
          alignItems="center"
          backgroundColor={isActive ? 'selected' : undefined}
          columnGap="tight"
          display="flex"
          fontSize={level >= 1 ? 'small' : undefined}
          fontWeight={level === 0 || isActive ? 'bold' : undefined}
          href={href}
          paddingX="tight"
          paddingY="xxtight"
          propsOnHover={{
            backgroundColor: 'selected',
          }}
          variant="bare"
        >
          {level >= 1 && (
            <Icon color="textFaded" name="turn-down-right" variant="light" />
          )}
          <span>{title}</span>
        </Anchor>

        {subSections && <NavigationTree data={subSections} level={level + 1} />}
      </Box>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

const NavigationTree = forwardRef(
  (
    { data, level = 0, ...otherProps }: NavigationTreeProps,
    ref: Ref<HTMLUListElement>
  ): JSX.Element => {
    return (
      <Box as="ul" ref={ref} {...otherProps}>
        {data.map((navigationItem, index) => (
          <NavigationItem key={index} level={level} {...navigationItem} />
        ))}
      </Box>
    );
  }
);

NavigationTree.displayName = 'NavigationTree';

export type { NavigationItem };
export { NavigationTree };
