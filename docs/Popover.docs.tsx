import { Button } from '@/react-handy-box/components/Button';
import { Popover } from '@/react-handy-box/components/Popover';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Popover',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => (
        <Popover
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open Popover</Button>
          )}
        >
          I am a popover. Click elsewhere to hide me.
        </Popover>
      ),
      renderSnippet: () => `
        <Popover
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>
              Open Popover
            </Button>
          )}
        >
          I am a popover. Click elsewhere to hide me.
        </Popover>
      `,
    },
  ],
};

export default docs;
