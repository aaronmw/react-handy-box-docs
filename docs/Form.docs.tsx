import { Box } from '@/react-handy-box/components/Box';
import { Button } from '@/react-handy-box/components/Button';
import {
  CheckboxesInput,
  RadioInput,
} from '@/react-handy-box/components/CheckboxesInput';
import { ElasticTextInput } from '@/react-handy-box/components/ElasticTextInput';
import { Form } from '@/react-handy-box/components/Form';
import { MultiSelectInput } from '@/react-handy-box/components/MultiSelectInput';
import { SelectableTable } from '@/react-handy-box/components/SelectableTable';
import { SingleSelectInput } from '@/react-handy-box/components/SingleSelectInput';
import { TextInput } from '@/react-handy-box/components/TextInput';
import { useState } from 'react';
import { DocumentationPageDescriptor } from '../pages';

const dummyOptions = [
  { key: 'abc', label: 'Apples', value: 'apples' },
  { key: 'def', label: 'Bananas', value: 'bananas' },
  { key: 'ghi', label: 'Cherries', value: 'cherries' },
];

const dummyColumns = [
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
];

const dummyRows = [
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
];

const FormDemo = () => {
  const [allFieldsDisabled, setAllFieldsDisabled] = useState(false);
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);

  return (
    <Box styles={{ rowGap: 'normal' }}>
      <Box styles={{ columnGap: 'tight' }}>
        <Button
          variant="pill"
          onClick={() => setAllFieldsDisabled(!allFieldsDisabled)}
        >
          {allFieldsDisabled ? 'Enable' : 'Disable'} All Fields
        </Button>
        <Button
          variant="pill"
          onClick={() => setAllFieldsRequired(!allFieldsRequired)}
        >
          Mark All Fields {allFieldsRequired ? 'Optional' : 'Required'}
        </Button>
      </Box>

      <Form
        styles={{
          rowGap: 'normal',
        }}
        onSubmit={(event, formContext) => {
          console.log(formContext?.getFieldValues());
        }}
      >
        <TextInput
          disabled={allFieldsDisabled}
          isRequired={allFieldsRequired}
          label="First Name"
          name="first_name"
          placeholder="Single-Line Text Input"
        />

        <ElasticTextInput
          disabled={allFieldsDisabled}
          isRequired={allFieldsRequired}
          label="Elastic (Auto-Expanding) Textarea"
          name="elastic_text_input"
          placeholder="Type some stuff into me..."
        />

        <CheckboxesInput
          disabled={allFieldsDisabled}
          isRequired={allFieldsRequired}
          label="Checkboxes Input"
          name="checkboxes"
          options={dummyOptions}
        />

        <RadioInput
          disabled={allFieldsDisabled}
          isRequired={allFieldsRequired}
          label="Radio Input"
          name="radios"
          options={dummyOptions}
        />

        <SingleSelectInput
          disabled={allFieldsDisabled}
          isRequired={allFieldsRequired}
          label="Single Select"
          name="single_select"
          options={dummyOptions}
          placeholder="Single-Select Input"
        />

        <MultiSelectInput
          disabled={allFieldsDisabled}
          isRequired={allFieldsRequired}
          label="Multi Select"
          name="multi_select"
          options={dummyOptions}
          placeholder="Multi-Select Input"
        />

        <SelectableTable
          columnDescriptors={dummyColumns as any}
          disabled={allFieldsDisabled}
          isMultiValue={true}
          isRequired={allFieldsRequired}
          label="Multi-Selectable Table"
          name="multi_selectable_table"
          rowObjects={dummyRows}
        />

        <SelectableTable
          columnDescriptors={dummyColumns as any}
          disabled={allFieldsDisabled}
          isMultiValue={false}
          isRequired={allFieldsRequired}
          label="Single-Selectable Table"
          name="single_selectable_table"
          rowObjects={dummyRows}
        />

        <Box
          styles={{
            columnGap: 'tight',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            type="reset"
            onClick={(e, formContext) => formContext?.resetForm()}
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </Box>
      </Form>
    </Box>
  );
};

const docs: DocumentationPageDescriptor = {
  title: 'Form',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => <FormDemo />,
      renderSnippet: () => `
        <Form
          styles={{
            rowGap: 'normal',
          }}
          onSubmit={(event, formContext) => {
            console.log(formContext?.getFieldValues());
          }}
        >
          <TextInput
            disabled={allFieldsDisabled}
            isRequired={allFieldsRequired}
            label="First Name"
            name="first_name"
            placeholder="Single-Line Text Input"
          />

          <CheckboxesInput
            disabled={allFieldsDisabled}
            isRequired={allFieldsRequired}
            label="Checkboxes Input"
            name="checkboxes"
            options={dummyOptions}
          />

          <RadioInput
            disabled={allFieldsDisabled}
            isRequired={allFieldsRequired}
            label="Radio Input"
            name="radios"
            options={dummyOptions}
          />

          <MultiSelectInput
            disabled={allFieldsDisabled}
            isRequired={allFieldsRequired}
            label="Multi Select"
            name="multi_select"
            options={dummyOptions}
            placeholder="Multi-Select Input"
          />

          <Box
            styles={{
              columnGap: 'tight',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type="reset"
              onClick={(e, formContext) =>
                formContext?.resetForm()
              }
            >
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </Form>
      `,
      highlightLines: [],
    },
  ],
};

export default docs;
