import { Box } from '@/react-handy-box/components/Box';
import { Button } from '@/react-handy-box/components/Button';
import {
  CheckboxesInput,
  RadioInput,
} from '@/react-handy-box/components/CheckboxesInput';
import { Form } from '@/react-handy-box/components/Form';
import { MultiSelectInput } from '@/react-handy-box/components/MultiSelectInput';
import { TextInput } from '@/react-handy-box/components/TextInput';
import { DocumentationPageDescriptor } from '../pages';

const dummyOptions = [
  { id: 1, label: 'Apples', value: 'apples' },
  { id: 2, label: 'Bananas', value: 'bananas' },
  { id: 3, label: 'Cherries', value: 'cherries' },
];

const docs: DocumentationPageDescriptor = {
  title: 'Form',
  demos: [
    {
      title: 'Usage',
      renderDemo: () => (
        <Form
          rowGap="normal"
          onSubmit={(event, formContext) => {
            console.log(formContext?.getFieldValues());
          }}
        >
          <TextInput
            isRequired={true}
            label="First Name"
            name="first_name"
            placeholder="Single-Line Text Input"
          />

          <CheckboxesInput
            isRequired={true}
            label="Checkboxes Input"
            name="checkboxes"
            options={dummyOptions}
          />

          <RadioInput
            isRequired={true}
            label="Radio Input"
            name="radios"
            options={dummyOptions}
          />

          <MultiSelectInput
            isRequired={true}
            label="Multi Select"
            name="multi_select"
            options={dummyOptions}
            placeholder="Multi-Select Input"
          />

          <Box columnGap="tight" justifyContent="flex-end">
            <Button
              type="reset"
              onClick={(e, formContext) => formContext?.resetForm()}
            >
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </Form>
      ),
      renderSnippet: () => `
        <Form
          rowGap="tight"
          onSubmit={(event, formContext) => {
            console.log(
              formContext?.getFieldValues()
            );
          }}
        >
          <TextInput
            isRequired={true}
            label="First Name"
            name="first_name"
            placeholder="Single-Line Text Input"
          />

          <CheckboxesInput
            isRequired={true}
            label="Checkboxes Input"
            name="checkboxes"
            options={dummyOptions}
          />

          <RadioInput
            isRequired={true}
            label="Radio Input"
            name="radios"
            options={dummyOptions}
          />

          <MultiSelectInput
            isRequired={true}
            label="Multi Select"
            name="multi_select"
            options={dummyOptions}
            placeholder="Multi-Select Input"
          />

          <Box
            columnGap="tight"
            justifyContent="flex-end"
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
      highlightLines: [6],
    },
  ],
};

export default docs;
