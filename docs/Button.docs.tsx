import { DocumentationPageDescriptor } from '@/pages';
import { Button } from '@/react-handy-box/components/Button';
import { tokenNames } from '@/tokenNames';
import capitalize from 'lodash/capitalize';

const docs: DocumentationPageDescriptor = {
  title: 'Button',
  demos: [
    {
      title: 'Types',
      values: [...tokenNames.buttonVariants],
      renderDemo: (buttonVariant) => (
        <Button variant={buttonVariant}>
          {capitalize(buttonVariant)} Button
        </Button>
      ),
      renderSnippet: (buttonVariant) => `
        <Button variant="${buttonVariant}">
          ${capitalize(buttonVariant)} Button
        </Button>
      `,
    },
  ],
};

export default docs;
