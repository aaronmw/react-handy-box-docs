import { Icon } from '@/react-handy-box/components/Icon';
import { tokenNames } from '@/tokenNames';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Icon',
  description: `
    This component gets its icons from [FontAwesome](https://fontawesome.com/icons).
    The names and variants are mapped to the options afforded by Font Awesome Pro 6.
  `,
  demos: [
    {
      title: 'Usage',
      values: [
        'tricycle',
        'mustache',
        'grill-hot',
        'pickaxe',
        'snowflake-droplets',
      ],
      renderDemo: (name) => <Icon name={name} />,
      renderSnippet: true,
    },

    {
      title: 'Sizes',
      description: `
        Because FontAwesome is an icon font, the size options correspond
        to the same options you have for font sizes. Adjust in
        \`tokens.fontSizesAndLineHeights\`.
      `,
      values: [...tokenNames.fontSizes],
      renderDemo: (size) => (
        <Icon name="tricycle" styles={{ fontSize: size }} />
      ),
      renderSnippet: true,
    },

    {
      title: 'Variants',
      description: `
        These are the weights supported by FontAwesome. Note that the \`brands\`
        variant supports an entirely different set of icon names.
      `,
      values: [
        'solid',
        'regular',
        'light',
        'thin',
        'duotone',
        'brands',
      ].reverse(),
      renderDemo: (variantName) => (
        <Icon
          name={variantName === 'brands' ? 'facebook' : 'tricycle'}
          variant={variantName}
        />
      ),
      renderSnippet: true,
    },
  ],
};

export default docs;
