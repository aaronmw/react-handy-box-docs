import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
import { toJSXAttributeValue } from '@/utilities/toJSXAttributeValue';
import {
  borderRadii,
  borderStyles,
  boxShadows,
  fontSizes,
  transitionDurations,
  whiteSpaceNames,
} from 'tokens';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Box',
  description: 'The base of all other components.',
  demos: [
    {
      title: 'backgroundColor',
      values: ['purple'],
      renderDemo: (colorName) => (
        <Box
          backgroundColor={colorName}
          borderRadius="small"
          color="white"
          padding="xtight"
        >
          I have a {colorName} background
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [2],
    },

    {
      title: 'backgroundColorLightness',
      values: [100, '+100', '-100'],
      renderDemo: (colorName) => (
        <Box
          backgroundColor="purple"
          backgroundColorLightness={colorName}
          borderRadius="small"
          padding="xtight"
        >
          {colorName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'border',
      values: Object.keys(borderStyles),
      renderDemo: (borderStyle) => (
        <Box border={borderStyle} borderRadius="small" padding="normal">
          {borderStyle}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [2],
    },

    {
      title: 'borderColor',
      values: [
        {
          borderColor: undefined,
          highlightLines: [2],
        },
        {
          borderColor: 'danger',
          highlightLines: [3],
        },
      ],
      renderDemo: ({ borderColor }) => {
        const borderColorProp = borderColor
          ? {
              borderColor,
            }
          : {};

        return (
          <Box
            border="normal"
            borderRadius="small"
            padding="normal"
            {...borderColorProp}
          >
            {borderColor ?? typeof borderColor}
          </Box>
        );
      },
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'borderColorLightness',
      values: [100, '+100', '-100'],
      renderDemo: (colorName) => (
        <Box
          borderColor="purple"
          borderColorLightness={colorName}
          borderRadius="small"
          padding="xtight"
        >
          purple--{colorName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'borderRadius',
      values: ([] as Array<string | number>).concat(
        Object.keys(borderRadii),
        25
      ),
      renderDemo: (borderRadius) => (
        <Box border="normal" borderRadius={borderRadius} padding="normal">
          {borderRadius}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'boxShadow',
      values: ([] as Array<string | number>).concat(
        Object.keys(boxShadows),
        '1px 1px 0 5px red'
      ),
      renderDemo: (boxShadow) => (
        <Box boxShadow={boxShadow} padding="normal">
          {boxShadow}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [2],
    },

    {
      title: 'color',
      values: [undefined, 'danger'],
      renderDemo: (color) => (
        <Box {...(color ? { color } : {})}>{color ?? typeof color}</Box>
      ),
      renderSnippet: true,
      highlightLines: [1],
    },

    {
      title: 'colorLightness',
      values: [100, '+100', '-100'],
      renderDemo: (colorName) => (
        <Box color="purple" colorLightness={colorName}>
          {colorName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'columnGap',
      description:
        'Setting this prop automatically sets `display: flex` for you.',
      values: ([] as Array<string | number>).concat(
        Object.keys(whiteSpaceNames),
        1
      ),
      renderDemo: (whiteSpaceName) => (
        <Box columnGap={whiteSpaceName}>
          {['A', 'B', 'C'].map((boxName) => (
            <Box backgroundColor="shaded" key={boxName} padding="tight">
              {boxName}
            </Box>
          ))}
        </Box>
      ),
      renderSnippet: (whiteSpaceName) => `
        <Box
          columnGap=${toJSXAttributeValue(whiteSpaceName)}
        >
          <Box />
          <Box />
          <Box />
        </Box>
      `,
      highlightLines: [2],
    },

    {
      title: 'columns',
      description:
        'Setting this prop automatically sets `display: grid` for you.',
      values: [2, ['1fr', '2fr'], ['100px', '1fr']],
      renderDemo: (columns) => (
        <Box columnGap="xtight" columns={columns}>
          {['Left', 'Right'].map((boxName) => (
            <Box backgroundColor="shaded" key={boxName} padding="tight">
              {boxName}
            </Box>
          ))}
        </Box>
      ),
      renderSnippet: (columns) => `
        <Box
          columnGap="xtight"
          columns=${toJSXAttributeValue(columns)}
        >
          <Box />
          <Box />
        </Box>
      `,
      highlightLines: [3],
    },

    {
      title: 'flexDirection',
      description:
        'Setting this prop automatically sets `display: flex` for you.',
      values: ['column', 'column-reverse', 'row', 'row-reverse'],
      renderDemo: (flexDirection) => (
        <Box flexDirection={flexDirection}>
          {['A', 'B', 'C'].map((boxName) => (
            <Box backgroundColor="shaded" key={boxName} padding="tight">
              {boxName}
            </Box>
          ))}
        </Box>
      ),
      renderSnippet: (flexDirection) => `
        <Box
          flexDirection="${flexDirection}"
        >
          <Box />
          <Box />
          <Box />
        </Box>
      `,
      highlightLines: [2],
    },

    {
      title: 'fontSize',
      description:
        'Check out the [Text](/docs/text) component for slightly nicer syntax.',
      values: Object.keys(fontSizes),
      renderDemo: (fontSize) => <Box fontSize={fontSize}>{fontSize}</Box>,
      renderSnippet: true,
      highlightLines: [1],
    },

    {
      title: 'margin/padding',
      values: Object.keys(whiteSpaceNames),
      renderDemo: (whiteSpaceName) => (
        <Box border="hairline" borderRadius="small" padding={whiteSpaceName}>
          {whiteSpaceName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'propsForPhoneOnly',
      renderDemo: () => (
        <Box
          propsForPhoneOnly={{
            color: 'danger',
          }}
        >
          Resize the Window
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [2, 3, 4],
    },

    {
      title: 'propsForAfterElement / propsForBeforeElement',
      values: [
        {
          renderDemo: () => (
            <Box
              propsForAfterElement={{
                color: 'danger',
                content: ` (I'm inside ::after)`,
              }}
            >
              Normal box content, or leave it empty.
            </Box>
          ),
          renderSnippet: true,
          highlightLines: [2, 3, 4, 5],
        },

        {
          renderDemo: () => (
            <Box
              propsForAfterElement={{
                backgroundColor: 'danger',
                borderRadius: 'circle',
                display: 'inline-block',
                height: 5,
                position: 'relative',
                top: -10,
                width: 5,
              }}
            >
              Email Address:
            </Box>
          ),
          renderSnippet: true,
          highlightLines: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
      renderDemo: ({ renderDemo }) => renderDemo(),
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'propsOnHover',
      values: [
        {
          props: {
            padding: 'normal',
            propsOnHover: {
              backgroundColor: 'shaded',
            },
          },
          highlightLines: [3, 4, 5],
        },

        {
          props: {
            padding: 'normal',
            transitionDuration: 'normal',
            propsOnHover: {
              backgroundColor: 'shaded',
            },
          },
          highlightLines: [3, 4, 5, 6],
        },
      ],
      renderDemo: ({ props }) => <Box {...props}>Hover Me</Box>,
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'transitionDuration',
      values: Object.keys(transitionDurations),
      renderDemo: (transitionDuration) => (
        <Box
          padding="normal"
          propsOnHover={{
            backgroundColor: 'shaded',
          }}
          transitionDuration={transitionDuration}
        >
          Hover to see {transitionDuration} transition
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [6],
    },

    {
      title: 'transitionProperty',
      values: [
        {
          transitionProperty: 'opacity',
          highlightLines: [10],
        },
        {
          transitionProperty: [
            'background-color',
            'border',
            'opacity',
            'width',
          ],
          highlightLines: [10, 11, 12, 13, 14, 15],
        },
      ],
      renderDemo: ({ transitionProperty }) => (
        <Box
          opacity={0.5}
          padding="normal"
          propsOnHover={{
            backgroundColor: 'shaded',
            border: 'normal',
            opacity: 1,
            width: '100%',
          }}
          width="75%"
          transitionProperty={transitionProperty}
        >
          Hover Me
        </Box>
      ),
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },
  ],
};

export default docs;
