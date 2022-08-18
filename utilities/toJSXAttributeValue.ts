import { indentLines } from '@/utilities/indentLines';

const toJSXAttributeValue = (
  value: unknown,
  numSpacesOfIndentation: number = 0
) =>
  typeof value === 'string'
    ? `"${value}"`
    : Array.isArray(value)
    ? `{[${value.map((subValue) => JSON.stringify(subValue))}]}`
    : typeof value === 'object'
    ? `{${indentLines(JSON.stringify(value, null, 2), numSpacesOfIndentation)}}`
    : `{${value}}`;

export { toJSXAttributeValue };
