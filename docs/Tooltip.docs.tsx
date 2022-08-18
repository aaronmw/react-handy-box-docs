import { Tooltip } from '@/react-handy-box/components/Tooltip';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Tooltip',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => <Tooltip content="I'm a tooltip!">Hover me.</Tooltip>,
      renderSnippet: true,
    },
  ],
};

export default docs;
