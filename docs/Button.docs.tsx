import { DocumentationPageDescriptor } from '@/pages';
import { Box } from '@/react-handy-box/components/Box';
import { Button } from '@/react-handy-box/components/Button';
import { Icon } from '@/react-handy-box/components/Icon';
import { tokenNames } from '@/tokenNames';
import capitalize from 'lodash/capitalize';

const docs: DocumentationPageDescriptor = {
  title: 'Button',
  demos: [
    {
      title: 'Types',
      values: [...tokenNames.buttonVariants],
      renderDemo: (buttonVariant) => (
        <Box styles={{ columnGap: 'tight' }}>
          <Button variant={buttonVariant}>
            {buttonVariant === 'iconOnly' ? (
              <Icon name="face-smile" />
            ) : (
              <>{capitalize(buttonVariant)} Button</>
            )}
          </Button>

          <Button disabled={true} variant={buttonVariant}>
            {buttonVariant === 'iconOnly' ? (
              <Icon name="face-smile" />
            ) : (
              <>Disabled {capitalize(buttonVariant)} Button</>
            )}
          </Button>
        </Box>
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
