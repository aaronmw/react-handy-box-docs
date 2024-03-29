import { Anchor } from '@/components/Anchor';
import { useLinkActivity } from '@/hooks/useLinkActivity';
import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Icon } from '@/react-handy-box/components/Icon';

type NavigationItem = {
  href: string;
  subSections?: Array<NavigationItem>;
  title: string;
  level?: number;
};

type NavigationTreeProps = Omit<
  BoxPropsWithoutRef<'ul'>,
  'children' | 'data'
> & {
  data: Array<NavigationItem>;
  level?: number;
};

type NavigationItemProps = Omit<
  BoxPropsWithoutRef<'li'>,
  'children' | 'title'
> &
  NavigationItem;

const NavigationItem = ({
  title,
  href,
  styles,
  subSections,
  level = 0,
  ...otherProps
}: NavigationItemProps): JSX.Element => {
  const { isActive } = useLinkActivity(href);

  return (
    <Box
      as="li"
      styles={{
        marginTop: level === 0 ? 'xtight' : undefined,
        ...styles,
      }}
      {...otherProps}
    >
      <Anchor
        href={href}
        styles={{
          alignItems: 'center',
          backgroundColor: isActive ? 'background--selected' : undefined,
          columnGap: 'tight',
          display: 'flex',
          fontSize: level >= 1 ? 'small' : undefined,
          fontWeight: level === 0 || isActive ? 'bold' : undefined,
          paddingX: 'tight',
          paddingY: 'xxtight',
          stylesOnHover: {
            backgroundColor: 'background--selected',
          },
        }}
        variant="bare"
      >
        {level >= 1 && (
          <Icon
            name="turn-down-right"
            styles={{ color: 'text--faded' }}
            variant="light"
          />
        )}
        <span>{title}</span>
      </Anchor>

      {subSections && <NavigationTree data={subSections} level={level + 1} />}
    </Box>
  );
};

const NavigationTree = ({
  data,
  level = 0,
  ...otherProps
}: NavigationTreeProps): JSX.Element => (
  <Box as="ul" {...otherProps}>
    {data.map((navigationItem, index) => (
      <NavigationItem key={index} level={level} {...navigationItem} />
    ))}
  </Box>
);

export type { NavigationItem };
export { NavigationTree };
