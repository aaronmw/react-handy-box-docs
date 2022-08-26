import { CodeSnippet } from '@/components/CodeSnippet';
import { Markdown } from '@/components/Markdown';
import { DocumentationSectionDescriptor } from '@/pages/index';
import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Text } from '@/react-handy-box/components/Text';
import kebabCase from 'lodash/kebabCase';
import reactElementToJSXString from 'react-element-to-jsx-string';

type DemoProps = Omit<BoxPropsWithoutRef, 'title'> &
  DocumentationSectionDescriptor;

const Demo = ({
  description,
  highlightLines,
  propsForContainer,
  renderDemo,
  renderSnippet,
  styles,
  title,
  values,
  ...otherProps
}: DemoProps) => (
  <Box styles={{ rowGap: 'normal', ...styles }} {...otherProps}>
    <Text id={kebabCase(title)} variant="heading--3">
      {title}
    </Text>

    {description && <Markdown>{description}</Markdown>}

    <Box
      {...propsForContainer}
      styles={{
        backgroundColor: 'shaded',
        borderRadius: 'normal',
        padding: 'normal',
        rowGap: 'normal',
        ...propsForContainer?.styles,
      }}
    >
      {(values ?? [undefined]).map((value, index) => (
        <Box
          key={index}
          styles={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 'normal',
            columns: renderSnippet ? 2 : undefined,
            columnGap: 'normal',
            padding: 'normal',
          }}
        >
          {renderSnippet && (
            <CodeSnippet
              highlightLines={
                typeof highlightLines === 'function'
                  ? highlightLines(value)
                  : highlightLines
              }
            >
              {typeof renderSnippet === 'function'
                ? renderSnippet?.(value)
                : reactElementToJSXString(renderDemo(value))}
            </CodeSnippet>
          )}

          <Box styles={{ flexGrow: 1 }}>{renderDemo(value)}</Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export { Demo };
