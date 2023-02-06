import { Markdown } from '@/components/Markdown';
import { DocumentationPageDescriptor } from '@/pages/index';
import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { ColorValue } from '@/react-handy-box/types';
import { tokenNames } from '@/tokenNames';

const swatchDescriptions = {
  'black': 'Handy to have around, sometimes.',
  'border': 'The default `borderColor` if none is specified',
  'primary':
    'The primary color used for buttons and as the base for many other UI elements. Change this to make sweeping changes to the overall theme.',
  'danger': 'For dangerous buttons, warnings, errors, etc.',
  'highlighted': 'For highlighted text / elements',
  'link--hovered': 'Pretty self-explanatory.',
  'link':
    'The color of clickable text links. Often the same as `primary`, but can be configured separately.',
  'shaded':
    'For darkening the background. Often a lighter version of `primary`',
  'shadow': 'The color of shadows cast by `boxShadow`',
  'text': 'The default color of all text on the page.',
  'textFaded': 'A lighter version of `text` for secondary or footnote copy.',
  'transparent': 'Description goes here...',
  'white': 'Description goes here...',
  'white--translucent': 'Description goes here...',
};

const docs: DocumentationPageDescriptor = {
  title: 'Color',
  description: 'The core colors are generated from the `colorPalette` tokens.',
  demos: [
    {
      title: 'Adjusting Colors',
      values: [
        {
          backgroundColor: 'blue',
          backgroundColorLightness: 100,
          resultingSwatchName: 'blue--100',
          highlightLines: [4],
        },
        {
          backgroundColor: 'blue',
          backgroundColorLightness: '-200',
          resultingSwatchName: 'blue--200',
          highlightLines: [4],
        },
        {
          backgroundColor: 'primary',
          backgroundColorOpacity: '-50',
          resultingSwatchName: 'purple--400--50',
          highlightLines: [4],
        },
        {
          backgroundColor: 'primary',
          backgroundColorOpacity: '-50',
          backgroundColorLightness: '-100',
          resultingSwatchName: 'purple--300--50',
          highlightLines: [4, 5],
        },
        {
          backgroundColor: 'primary',
          backgroundColorOpacity: 10,
          backgroundColorLightness: 300,
          resultingSwatchName: 'purple--300--10',
          highlightLines: [4, 5],
        },
      ],
      renderSnippet: ({
        backgroundColor,
        backgroundColorOpacity,
        backgroundColorLightness,
      }) =>
        `
          <Box
            styles={{
              backgroundColor: ${JSON.stringify(backgroundColor)},
              ${
                backgroundColorOpacity
                  ? `backgroundColorOpacity: ${JSON.stringify(
                      backgroundColorOpacity
                    )},`
                  : ``
              }
              ${
                backgroundColorLightness
                  ? `backgroundColorLightness: ${JSON.stringify(
                      backgroundColorLightness
                    )},`
                  : ``
              }
            }}
          />
      `.replace(/\n\s*?\n/g, '\n'),
      renderDemo: ({ resultingSwatchName }) => (
        <ColorSwatch
          colorName={resultingSwatchName}
          styles={{ borderRadius: 'small' }}
        />
      ),
      highlightLines: ({ highlightLines }) => highlightLines,
    },

    {
      title: 'Core Swatches',
      values: [...tokenNames.colorsCore],
      renderDemo: (colorName) => (
        <Box
          styles={{
            borderRadius: 'small',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {[100, 200, 300, 400, 500, 600, 700].map((lightnessValue) => (
            <ColorSwatch
              colorName={`${colorName}--${lightnessValue}` as ColorValue}
              key={lightnessValue}
            />
          ))}
        </Box>
      ),
      propsForContainer: {
        styles: {
          columns: 3,
          gap: 'normal',
          alignContent: 'stretch',
          justifyContent: 'stretch',
        },
      },
    },

    {
      title: 'Semantic Swatches',
      values: tokenNames.colorAliases.map((swatchName) => ({
        swatchName,
        description:
          swatchDescriptions[swatchName as keyof typeof swatchDescriptions],
      })),
      renderDemo: ({ description, swatchName }) => (
        <Box
          styles={{
            alignItems: 'center',
            columnGap: 'normal',
            columns: 2,
          }}
        >
          <ColorSwatch
            colorName={swatchName}
            key={swatchName}
            styles={{
              borderRadius: 'small',
            }}
          />
          <Markdown>{description}</Markdown>
        </Box>
      ),
    },

    {
      title: 'Utility Colors',
      values: [...tokenNames.colorsUtility],
      renderDemo: (utilityColorName) => (
        <Box
          styles={{
            background: `
              repeating-linear-gradient(
                -55deg,
                #222,
                #222 10px,
                #333 10px,
                #333 20px
              )
            `,
            borderRadius: 'small',
            padding: 'normal',
          }}
        >
          <ColorSwatch
            colorName={utilityColorName}
            key={utilityColorName}
            styles={{
              border: 'normal',
              borderColor: 'white',
              borderRadius: 'small',
            }}
          />
        </Box>
      ),
    },
  ],
};

const ColorSwatch = ({
  colorName,
  styles,
  ...otherProps
}: BoxPropsWithoutRef & {
  colorName: ColorValue;
}) => (
  <Box
    styles={{
      alignItems: 'center',
      backgroundColor: colorName,
      padding: 'tight',
      width: '100%',
      ...styles,
    }}
    {...otherProps}
  >
    <Box
      styles={{
        backgroundColor: 'background',
        border: 'normal',
        borderColor: colorName,
        borderColorLightness: '+100',
        borderRadius: 'circle',
        color: 'textFaded',
        display: 'inline-block',
        fontFamily: 'monospace',
        fontSize: 'small',
        paddingX: 'tight',
      }}
    >
      {colorName}
    </Box>
  </Box>
);

export default docs;
