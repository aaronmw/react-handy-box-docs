import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import { createGlobalStyle, CSSObject } from 'styled-components';
import { animationNames, breakpoints, globalStyles } from '../tokens';

const toCSSPropertyDefinitions = (styleObject: CSSObject) =>
  Object.entries(styleObject)
    .map(
      ([cssPropertyName, value]) => `${kebabCase(cssPropertyName)}: ${value};`
    )
    .join('\n');

const toCSSVariables = (variableMap: Record<string, Record<string, string>>) =>
  Object.keys(variableMap)
    .reduce<Array<string>>(
      (acc, variableName) => [
        ...acc,
        ...Object.entries(variableMap[variableName]).map(
          ([optionName, optionValue]) =>
            `--${variableName}--${optionName}: ${optionValue};`
        ),
      ],
      []
    )
    .join('\n');

const GlobalStyles = createGlobalStyle`
  * {
    background-color: transparent;
    border: none;
    box-sizing: border-box;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    list-style-type: none;
    margin: 0;
    outline: none;
    padding: 0;
    text-align: inherit;
    text-decoration: none;
  }

  ::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  ${Object.entries(animationNames)
    .map(
      ([name, animation]) => `
        @keyframes ${name} {
          ${animation.keyframes}
        }
      `
    )
    .join('\n')}

  ${Object.entries(breakpoints)
    .reverse()
    .map(([breakpointName, mediaQuery]) => {
      const cssVariables = toCSSVariables(
        get(globalStyles, `${breakpointName}.cssVariables`, {})
      );

      const styles = toCSSPropertyDefinitions(
        get(globalStyles, `${breakpointName}.styles`, {})
      );

      return `
        ${mediaQuery} {
          :root {
            --breakpoint--${breakpointName}--isActive: true;
            ${cssVariables}
            ${styles}
          }
        }
      `;
    })
    .join('\n')}
`;

export { GlobalStyles };
