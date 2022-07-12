import mapValues from "lodash/mapValues";

export const whiteSpaceNames = {
  xxloose: "15vh",
  xloose: "5rem",
  loose: "3rem",
  normal: "2rem",
  tight: "1rem",
  xtight: "0.5rem",
  xxtight: "0.25rem",
};

export const whiteSpacesAsCSSVariables = mapValues(
  whiteSpaceNames,
  (_, whiteSpaceName) => `var(--whiteSpace--${whiteSpaceName})`
);
