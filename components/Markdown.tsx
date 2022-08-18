import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { Text } from '@/react-handy-box/components/Text';
import { forwardRef, Ref } from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownProps = Omit<BoxProps, 'children' | 'ref'> & {
  children: string;
};

const Markdown = forwardRef(
  ({ children, ...otherProps }: MarkdownProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Box ref={ref} {...otherProps}>
        <ReactMarkdown
          components={{
            a: ({ node, className, ...props }) => (
              <Text as="a" color="link" target="_blank" {...(props as any)} />
            ),
            code: ({ node, inline, className, ...props }) => (
              <Text
                as={inline ? 'code' : 'pre'}
                variant="code"
                {...(props as any)}
              />
            ),
            em: ({ node, className, ...props }) => (
              <Text as="em" fontStyle="italic" {...(props as any)} />
            ),
            strong: ({ node, className, ...props }) => (
              <Text as="strong" fontWeight="bold" {...(props as any)} />
            ),
          }}
        >
          {children}
        </ReactMarkdown>
      </Box>
    );
  }
);

Markdown.displayName = 'Markdown';

export { Markdown };
