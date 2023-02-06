import { DocumentationPageDescriptor } from '@/pages/index';
import { Box } from '@/react-handy-box/components/Box';
import { tokenNames } from '@/tokenNames';
import range from 'lodash/range';

const docs: DocumentationPageDescriptor = {
  title: 'Box',
  description: 'The base of all other components.',
  demos: [
    {
      title: 'backgroundColor',
      values: ['purple'],
      renderDemo: (colorName) => (
        <Box
          styles={{
            backgroundColor: colorName,
            borderRadius: 'small',
            color: 'white',
            padding: 'xtight',
          }}
        >
          I have a {colorName} background
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'backgroundColorLightness',
      values: [
        { adjustment: 100, resultingSwatchName: 'purple--100' },
        { adjustment: '+100', resultingSwatchName: 'purple--500' },
        { adjustment: '-100', resultingSwatchName: 'purple--300' },
      ],
      renderDemo: ({ adjustment, resultingSwatchName }) => (
        <Box
          styles={{
            backgroundColor: 'purple',
            backgroundColorLightness: adjustment,
            borderRadius: 'small',
            padding: 'xtight',
          }}
        >
          {resultingSwatchName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'backgroundColorOpacity',
      values: [
        { adjustment: 50, resultingSwatchName: 'purple--400--50' },
        { adjustment: '-80', resultingSwatchName: 'purple--400--20' },
      ],
      renderDemo: ({ adjustment, resultingSwatchName }) => (
        <Box
          styles={{
            backgroundColor: 'purple',
            backgroundColorOpacity: adjustment,
            borderRadius: 'small',
            padding: 'xtight',
          }}
        >
          {resultingSwatchName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'border',
      values: [...tokenNames.borderStyles],
      renderDemo: (borderStyle) => (
        <Box
          styles={{
            border: borderStyle,
            borderRadius: 'small',
            padding: 'normal',
          }}
        >
          {borderStyle}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'borderColor',
      values: [
        {
          borderColor: undefined,
          highlightLines: [3],
        },
        {
          borderColor: 'danger',
          highlightLines: [4],
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
            styles={{
              border: 'normal',
              borderRadius: 'small',
              padding: 'normal',
              ...borderColorProp,
            }}
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
      values: [
        { adjustment: 100, resultingSwatchName: 'purple--100' },
        { adjustment: '+100', resultingSwatchName: 'purple--500' },
        { adjustment: '-100', resultingSwatchName: 'purple--300' },
      ],
      renderDemo: ({ adjustment, resultingSwatchName }) => (
        <Box
          styles={{
            borderColor: 'purple',
            borderColorLightness: adjustment,
            borderRadius: 'small',
            padding: 'xtight',
          }}
        >
          {resultingSwatchName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'borderColorOpacity',
      values: [
        { adjustment: 50, resultingSwatchName: 'purple--400--50' },
        { adjustment: '-80', resultingSwatchName: 'purple--400--20' },
      ],
      renderDemo: ({ adjustment, resultingSwatchName }) => (
        <Box
          styles={{
            borderColor: 'purple',
            borderColorOpacity: adjustment,
            borderRadius: 'small',
            padding: 'xtight',
          }}
        >
          {resultingSwatchName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'borderRadius',
      values: [...tokenNames.borderRadii, 25],
      renderDemo: (borderRadius) => (
        <Box
          styles={{
            border: 'normal',
            borderRadius,
            padding: 'normal',
          }}
        >
          {borderRadius}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'boxShadow',
      values: [...tokenNames.boxShadows, '2px 2px 5px red'],
      renderDemo: (boxShadow) => (
        <Box
          styles={{
            boxShadow,
            padding: 'normal',
          }}
        >
          {boxShadow}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'color',
      values: [
        { color: undefined, highlightLines: [] },
        { color: 'danger', highlightLines: [3] },
      ],
      renderDemo: ({ color }) => (
        <Box {...(color ? { styles: { color } } : {})}>
          {color ?? typeof color}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'colorLightness',
      values: [
        {
          adjustment: 400,
          resultingSwatchName: 'blue--400',
          highlightLines: [3],
        },
        {
          color: 'purple',
          adjustment: 100,
          resultingSwatchName: 'purple--100',
          highlightLines: [4],
        },
        {
          color: 'purple',
          adjustment: '+100',
          resultingSwatchName: 'purple--500',
          highlightLines: [4],
        },
        {
          color: 'purple',
          adjustment: '-100',
          resultingSwatchName: 'purple--300',
          highlightLines: [4],
        },
      ],
      renderDemo: ({ adjustment, color, resultingSwatchName }) => (
        <Box
          styles={{
            ...(color ? { color } : {}),
            colorLightness: adjustment,
          }}
        >
          {resultingSwatchName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'colorOpacity',
      values: [
        { adjustment: 50, resultingSwatchName: 'purple--400--50' },
        { adjustment: '-80', resultingSwatchName: 'purple--400--20' },
      ],
      renderDemo: ({ adjustment, resultingSwatchName }) => (
        <Box
          styles={{
            color: 'purple',
            colorOpacity: adjustment,
          }}
        >
          {resultingSwatchName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [4],
    },

    {
      title: 'columnGap',
      description:
        'Setting this prop automatically sets `display: flex` for you.',
      values: [...tokenNames.whitespaces, 1],
      renderDemo: (whitespaceName) => (
        <Box
          styles={{
            columnGap: whitespaceName,
          }}
        >
          {['A', 'B', 'C'].map((boxName) => (
            <Box
              key={boxName}
              styles={{
                backgroundColor: 'background--shaded',
                padding: 'tight',
              }}
            >
              {boxName}
            </Box>
          ))}
        </Box>
      ),
      renderSnippet: (whitespaceName) => `
        <Box
          styles={{
            columnGap: ${JSON.stringify(whitespaceName)}
          }}
        >
          <Box />
          <Box />
          <Box />
        </Box>
      `,
      highlightLines: [3],
    },

    {
      title: 'columns',
      description:
        'Setting this prop automatically sets `display: grid` for you.',
      values: [2, ['1fr', '2fr'], ['100px', '1fr']],
      renderDemo: (columns) => (
        <Box
          styles={{
            columnGap: 'xtight',
            columns,
          }}
        >
          {['Left', 'Right'].map((boxName) => (
            <Box
              key={boxName}
              styles={{
                backgroundColor: 'background--shaded',
                padding: 'tight',
              }}
            >
              {boxName}
            </Box>
          ))}
        </Box>
      ),
      renderSnippet: (columns) => `
        <Box
          styles={{
            columnGap: "xtight",
            columns: ${JSON.stringify(columns)},
          }}
        >
          <Box />
          <Box />
        </Box>
      `,
      highlightLines: [4],
    },

    {
      title: 'flexDirection',
      description:
        'Setting this prop automatically sets `display: flex` for you.',
      values: ['column', 'column-reverse', 'row', 'row-reverse'],
      renderDemo: (flexDirection) => (
        <Box styles={{ flexDirection }}>
          {['A', 'B', 'C'].map((boxName) => (
            <Box
              key={boxName}
              styles={{
                backgroundColor: 'background--shaded',
                padding: 'tight',
              }}
            >
              {boxName}
            </Box>
          ))}
        </Box>
      ),
      renderSnippet: (flexDirection) => `
        <Box
          styles={{
            flexDirection: ${JSON.stringify(flexDirection)},
          }}
        >
          <Box />
          <Box />
          <Box />
        </Box>
      `,
      highlightLines: [3],
    },

    {
      title: 'fontSize',
      description:
        'Check out the [Text](/docs/text) component for slightly nicer syntax.',
      values: [...tokenNames.fontSizes],
      renderDemo: (fontSize) => <Box styles={{ fontSize }}>{fontSize}</Box>,
      renderSnippet: true,
      highlightLines: [3],
    },

    {
      title: 'margin/padding',
      values: [...tokenNames.whitespaces],
      renderDemo: (whitespaceName) => (
        <Box
          styles={{
            border: 'hairline',
            borderRadius: 'small',
            padding: whitespaceName,
          }}
        >
          {whitespaceName}
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [5],
    },

    {
      title: 'stylesForPhoneOnly',
      renderDemo: () => (
        <Box
          styles={{
            stylesForPhoneOnly: {
              color: 'danger',
            },
          }}
        >
          Resize the Window
        </Box>
      ),
      renderSnippet: true,
      highlightLines: range(3, 6),
    },

    {
      title: 'stylesForAfterElement / stylesForBeforeElement',
      values: [
        {
          renderDemo: () => (
            <Box
              styles={{
                stylesForAfterElement: {
                  color: 'danger',
                  content: ` (I'm inside ::after)`,
                },
              }}
            >
              Normal box content, or leave it empty.
            </Box>
          ),
          renderSnippet: true,
          highlightLines: range(3, 7),
        },

        {
          renderDemo: () => (
            <Box
              styles={{
                stylesForAfterElement: {
                  backgroundColor: 'danger',
                  borderRadius: 'circle',
                  display: 'inline-block',
                  height: 5,
                  position: 'relative',
                  top: -10,
                  width: 5,
                },
              }}
            >
              Email Address:
            </Box>
          ),
          renderSnippet: true,
          highlightLines: range(3, 12),
        },
      ],
      renderDemo: ({ renderDemo }) => renderDemo(),
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'stylesOnHover',
      values: [
        {
          styles: {
            padding: 'normal',
            stylesOnHover: {
              backgroundColor: 'background--shaded',
            },
          },
          highlightLines: range(4, 7),
        },

        {
          styles: {
            padding: 'normal',
            transitionDuration: 'normal',
            stylesOnHover: {
              backgroundColor: 'background--shaded',
            },
          },
          highlightLines: [7],
        },
      ],
      renderDemo: ({ styles }) => <Box styles={styles}>Hover Me</Box>,
      renderSnippet: true,
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'transitionDuration',
      values: [...tokenNames.animationDurations, '3.5s'],
      renderDemo: (transitionDuration) => (
        <Box
          styles={{
            padding: 'normal',
            stylesOnHover: {
              backgroundColor: 'background--shaded',
            },
            transitionDuration,
          }}
        >
          Hover to see {transitionDuration} transition
        </Box>
      ),
      renderSnippet: true,
      highlightLines: [7],
    },

    {
      title: 'transitionProperty',
      values: [
        {
          transitionProperty: 'opacity',
          highlightLines: [11],
        },
        {
          transitionProperty: [
            'background-color',
            'border',
            'opacity',
            'width',
          ],
          highlightLines: range(11, 17),
        },
      ],
      renderDemo: ({ transitionProperty }) => (
        <Box
          styles={{
            opacity: 0.5,
            padding: 'normal',
            stylesOnHover: {
              backgroundColor: 'background--shaded',
              border: 'normal',
              opacity: 1,
              width: '100%',
            },
            width: '75%',
            transitionProperty,
          }}
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
