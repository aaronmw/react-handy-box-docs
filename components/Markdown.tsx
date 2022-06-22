import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
import { forwardRef, Ref } from 'react';
import ReactMarkdown from 'react-markdown';
import { BoxProps } from './Box.types';

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

export { Markdown };
