import { Tooltip } from '@/react-handy-box/components/Tooltip';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Tooltip',
  demos: [
    {
      title: 'Usage',
      values: [
        `I'm a short tooltip!`,
        `I am a much, much longer tooltip. I should have wrapped to at least a couple of lines by now.`,
      ],
      renderDemo: (value) => (
        <Tooltip content={value} styles={{ display: 'inline-block' }}>
          Hover me.
        </Tooltip>
      ),
      renderSnippet: true,
    },
  ],
};

export default docs;
