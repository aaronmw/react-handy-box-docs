import { DocumentationPageDescriptor } from '@/pages';
import { Form } from '@/react-handy-box/components/Form';
import { SelectableTable } from '@/react-handy-box/components/SelectableTable';

const docs: DocumentationPageDescriptor = {
  title: 'SelectableTable',
  description: `The same API of \`<Table />\`, but \`options\` require a \`value\` property as well.`,
  demos: [
    {
      title: 'Usage',
      renderDemo: () => (
        <Form>
          <SelectableTable
            columnDescriptors={[
              {
                key: 'quantity',
                label: 'Quantity',
              },
              {
                key: 'itemName',
                label: 'Item Name',
              },
            ]}
            isMultiValue={true}
            label="Fruit"
            name="fruit"
            rowObjects={[
              { key: 1, quantity: '6', itemName: 'Apples', value: 'apples' },
              { key: 2, quantity: '3', itemName: 'Bananas', value: 'bananas' },
              {
                key: 3,
                quantity: '7',
                itemName: 'Cherries',
                value: 'cherries',
              },
              { key: 4, quantity: '2', itemName: 'Durians', value: 'durians' },
              {
                key: 5,
                quantity: '4',
                itemName: 'Elderberries',
                value: 'elderberries',
              },
            ]}
          />
        </Form>
      ),
      renderSnippet: true,
      highlightLines: [16, 21],
    },
  ],
};

export default docs;
