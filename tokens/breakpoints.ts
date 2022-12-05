export const breakpointNames = [
  'bigDesktopOrLarger',
  'desktopOrLarger',
  'tabletOrLarger',
  'phoneOrTablet',
  'tabletOnly',
  'phoneOnly',
  'root',
] as const;

export const breakpoints = {
  bigDesktopOrLarger: '@media screen and (min-width: 1600px)',
  desktopOrLarger: '@media screen and (min-width: 1200px)',
  tabletOrLarger: '@media screen and (min-width: 501px)',
  phoneOrTablet: '@media screen and (max-width: 1199px)',
  tabletOnly: '@media screen and (min-width: 501px) and (max-width: 1199px)',
  phoneOnly: '@media screen and (max-width: 500px)',
  root: '@media screen',
};
