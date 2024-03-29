import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Text } from '@/react-handy-box/components/Text';
import ReactMarkdown from 'react-markdown';

type MarkdownProps = Omit<BoxPropsWithoutRef, 'children'> & {
  children: string;
};

const Markdown = ({ children, ...otherProps }: MarkdownProps) => (
  <Box {...otherProps}>
    <ReactMarkdown
      components={{
        a: ({ node, className, ...props }) => (
          <Text
            as="a"
            target="_blank"
            styles={{
              color: 'text--link',
            }}
            {...(props as any)}
          />
        ),
        code: ({ node, inline, className, ...props }) => (
          <Text
            as={inline ? 'code' : 'pre'}
            variant="code"
            {...(props as any)}
          />
        ),
        em: ({ node, className, ...props }) => (
          <Text as="em" styles={{ fontStyle: 'italic' }} {...(props as any)} />
        ),
        strong: ({ node, className, ...props }) => (
          <Text
            as="strong"
            styles={{ fontWeight: 'bold' }}
            {...(props as any)}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  </Box>
);

export { Markdown };
