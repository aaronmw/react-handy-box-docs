import mapValues from 'lodash/mapValues';

export const whiteSpaceNames = {
  xxloose: '15vh',
  xloose: '4rem',
  loose: '2rem',
  normal: '1rem',
  tight: '0.5rem',
  xtight: '0.25rem',
};

export const whiteSpacesAsCSSVariables = mapValues(
  whiteSpaceNames,
  (_, whiteSpaceName) => `var(--whiteSpace--${whiteSpaceName})`
);
