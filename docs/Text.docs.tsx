import { Text } from '@/react-handy-box/components/Text';
import { tokenNames } from '@/tokenNames';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Text',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => <Text weight="bold">Hey, I&rsquo;m some text 👋</Text>,
      renderSnippet: () => `
        <Text weight="bold">Hey, I'm some text 👋</Text>
      `,
    },

    {
      title: 'Variants',
      description:
        'These are canned styles configured in `tokens.textVariants`.',
      values: [...tokenNames.textVariants],
      renderDemo: (variantName) => (
        <Text variant={variantName}>{variantName}</Text>
      ),
      renderSnippet: true,
    },
  ],
};

export default docs;
