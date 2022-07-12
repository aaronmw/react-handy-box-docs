import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Text } from '@/components/Text';
import { forwardRef, Ref } from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownProps = Omit<BoxProps<'div'>, 'children' | 'ref'> & {
  children: string;
};

const Markdown = forwardRef(
  ({ children, ...otherProps }: MarkdownProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Box ref={ref} {...otherProps}>
        <ReactMarkdown
          children={children}
          components={{
            code: ({ node, inline, className, ...props }) => (
              <Text
                as={inline ? 'code' : 'pre'}
                variant="code"
                {...(props as any)}
              />
            ),
          }}
        />
      </Box>
    );
  }
);

Markdown.displayName = 'Markdown';

export { Markdown };
