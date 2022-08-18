import { CodeSnippet } from '@/components/CodeSnippet';
import { Markdown } from '@/components/Markdown';
import { DocumentationSectionDescriptor } from '@/pages/index';
import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { Text } from '@/react-handy-box/components/Text';
import kebabCase from 'lodash/kebabCase';
import { forwardRef, Ref } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

type DemoProps = Omit<BoxProps, 'ref' | 'title'> &
  DocumentationSectionDescriptor;

const Demo = forwardRef(
  (
    {
      description,
      highlightLines,
      propsForContainer,
      renderDemo,
      renderSnippet,
      title,
      values,
      ...otherProps
    }: DemoProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Box ref={ref} rowGap="normal" {...otherProps}>
        <Text id={kebabCase(title)} variant="heading--3">
          {title}
        </Text>

        {description && <Markdown>{description}</Markdown>}

        <Box
          backgroundColor="shaded"
          borderRadius="normal"
          padding="normal"
          rowGap="normal"
          {...propsForContainer}
        >
          {(values ?? [undefined]).map((value, index) => (
            <Box
              alignItems="center"
              backgroundColor="white"
              borderRadius="normal"
              columns={renderSnippet ? 2 : undefined}
              columnGap="normal"
              key={index}
              padding="normal"
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

              <Box flexGrow={1}>{renderDemo(value)}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
);

Demo.displayName = 'Demo';

export { Demo };
