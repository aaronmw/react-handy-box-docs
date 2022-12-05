import { Button } from '@/react-handy-box/components/Button';
import { Text } from '@/react-handy-box/components/Text';
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
  ],
};

export default docs;
