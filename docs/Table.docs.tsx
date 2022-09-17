import { Button } from '@/react-handy-box/components/Button';
import { Table } from '@/react-handy-box/components/Table';
import { DocumentationPageDescriptor } from '../pages';

const docs: DocumentationPageDescriptor = {
  title: 'Table',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => (
        <Table
          columnDescriptors={[
            {
              key: 'quantity',
              label: 'Quantity',
              propsForCells: {
                styles: {
                  textAlign: 'center',
                },
              },
            },
            {
              key: 'itemName',
              label: 'Item Name',
            },
          ]}
          rowObjects={[
            { key: 1, quantity: '6', itemName: 'Apples' },
            { key: 2, quantity: '3', itemName: 'Bananas' },
            { key: 3, quantity: '7', itemName: 'Cherries' },
            { key: 4, quantity: '2', itemName: 'Durians' },
            { key: 5, quantity: '4', itemName: 'Elderberries' },
          ]}
        />
      ),
      renderSnippet: true,
      highlightLines: [2, 17],
    },
  ],
};

export default docs;
