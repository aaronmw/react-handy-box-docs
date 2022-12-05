import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { AnchorButton } from '@/react-handy-box/components/Button';
import { Text } from '@/react-handy-box/components/Text';
import merge from 'lodash/merge';
import { ComponentProps, forwardRef, Ref } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type MarkdownProps = Omit<BoxPropsWithoutRef<'div'>, 'children'> & {
  children: string;
  propsForReactMarkdown?: Omit<
    ComponentProps<typeof ReactMarkdown>,
    'children'
  >;
};

const Markdown = forwardRef(
  (
    { children, propsForReactMarkdown, ...otherProps }: MarkdownProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Box ref={ref} {...otherProps}>
        <ReactMarkdown
          {...merge(
            {
              components: {
                a: ({ href, node, className, ...props }) => (
                  <AnchorButton
                    {...merge(
                      {
                        href,
                        styles: {
                          wordBreak: 'break-word',
                        },
                        target: href?.startsWith('http') ? '_blank' : undefined,
                        variant: 'textLink',
                      },
                      props as any
                    )}
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
                  <Text as="em" style="italic" {...(props as any)} />
                ),
                strong: ({ node, className, ...props }) => (
                  <Text as="strong" weight="bold" {...(props as any)} />
                ),
              },
              rehypePlugins: [rehypeRaw],
              remarkPlugins: [remarkGfm],
            } as ReactMarkdownOptions,
            propsForReactMarkdown
          )}
        >
          {children}
        </ReactMarkdown>
      </Box>
    );
  }
);

Markdown.displayName = 'Markdown';

export { Markdown };
