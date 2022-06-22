import { Box } from '@/components/Box';
import { BoxProps, Color } from '@/components/Box.types';
import { Markdown } from '@/components/Markdown';
import { toJSXAttributeValue } from '@/utilities/toJSXAttributeValue';
import {
  coreColorDefinitions,
  semanticSwatchAliases,
  utilityColors,
} from 'tokens/colorPalette';
import { DocumentationPageDescriptor } from '../pages';

const swatchDescriptions = {
  'black': 'Handy to have around, sometimes.',
  'border': 'The default `borderColor` if none is specified',
  'brand':
    'The primary color used for buttons and as the base for many other UI elements. Change this to make sweeping changes to the overall theme.',
  'danger': 'For dangerous buttons, warnings, errors, etc.',
  'highlighted': 'For highlighted text / elements',
  'link--hovered': 'Pretty self-explanatory.',
  'link':
    'The color of clickable text links. Often the same as `brand`, but can be configured separately.',
  'shaded': 'For darkening the background. Often a lighter version of `brand`',
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
        },
        {
          backgroundColor: 'blue',
          backgroundColorLightness: '-200',
          resultingSwatchName: 'blue--200',
        },
      ],
      renderSnippet: ({ backgroundColor, backgroundColorLightness }) => `
        <Box
          backgroundColor="${backgroundColor}"
          backgroundColorLightness=${toJSXAttributeValue(
            backgroundColorLightness
          )}
        />
      `,
      renderDemo: ({ resultingSwatchName }) => (
        <ColorSwatch borderRadius="small" colorName={resultingSwatchName} />
      ),
      highlightLines: [3],
    },

    {
      title: 'Core Swatches',
      values: Object.keys(coreColorDefinitions),
      renderDemo: (colorName) => (
        <Box borderRadius="small" overflow="hidden" width="100%">
          {[100, 200, 300, 400, 500, 600, 700].map((lightnessValue) => (
            <ColorSwatch
              colorName={`${colorName}--${lightnessValue}` as Color}
              key={lightnessValue}
            />
          ))}
        </Box>
      ),
      propsForContainer: {
        columns: 3,
        gap: 'normal',
        alignContent: 'stretch',
        justifyContent: 'stretch',
      },
    },

    {
      title: 'Semantic Swatches',
      values: Object.keys(semanticSwatchAliases).map((swatchName) => ({
        swatchName,
        description:
          swatchDescriptions[swatchName as keyof typeof swatchDescriptions],
      })),
      renderDemo: ({ description, swatchName }) => (
        <Box alignItems="center" columnGap="normal" columns={2}>
          <ColorSwatch
            borderRadius="small"
            colorName={swatchName as Color}
            key={swatchName}
          />
          <Markdown children={description} />
        </Box>
      ),
    },

    {
      title: 'Utility Colors',
      values: Object.keys(utilityColors),
      renderDemo: (utilityColorName) => (
        <Box backgroundColor="black" borderRadius="small" padding="normal">
          <ColorSwatch
            border="normal"
            borderColor="white"
            borderRadius="small"
            colorName={utilityColorName as Color}
            key={utilityColorName}
          />
        </Box>
      ),
    },
  ],
};

const ColorSwatch = ({
  colorName,
  ...otherProps
}: BoxProps<'div'> & {
  colorName: Color;
}) => (
  <Box
    alignItems="center"
    backgroundColor={colorName}
    padding="tight"
    width="100%"
    {...otherProps}
  >
    <Box
      backgroundColor="white"
      border="normal"
      borderColor={colorName}
      borderColorLightness="+100"
      borderRadius="circle"
      color="textFaded"
      display="inline-block"
      fontFamily="monospace"
      fontSize="small"
      paddingX="tight"
    >
      {colorName}
    </Box>
  </Box>
);

export default docs;
