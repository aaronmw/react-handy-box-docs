import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { borderRadii, borderStyles, colorPalette } from '../tokens';

type CodeSnippetProps = Omit<BoxProps<'div'>, 'children'> & {
  children: string;
  highlightLines?: Array<number>;
};

const highlightedLineProps = {
  backgroundColor: colorPalette['yellow--100'],
  display: 'block',
  fontWeight: 'bold',
};

const CodeSnippet = ({
  children,
  highlightLines = [],
  ...otherProps
}: CodeSnippetProps) => {
  const trimmedCodeSnippet = removeIndentation(children);

  return (
    <Box fontFamily="monospace" {...otherProps}>
      <SyntaxHighlighter
        language="jsx"
        lineNumberStyle={{ display: 'none' }}
        lineProps={(lineNumber) => {
          const isHighlightedLine = highlightLines.includes(lineNumber);

          return {
            style: isHighlightedLine ? highlightedLineProps : {},
          };
        }}
        showLineNumbers={true}
        style={styles}
        wrapLines={true}
      >
        {trimmedCodeSnippet}
      </SyntaxHighlighter>
    </Box>
  );
};

const removeIndentation = (code: string) => {
  const lines = code.trim().split('\n');

  const smallestIndentation = lines.slice(1).reduce((acc, line) => {
    const numLeadingSpaces = line.match(/^[ ]*/)![0].length;

    return numLeadingSpaces < acc ? numLeadingSpaces : acc;
  }, Infinity);

  if (smallestIndentation === Infinity) {
    return code;
  }

  const trimmedLines = lines
    .slice(1)
    .map((line) => line.slice(smallestIndentation));

  return [lines[0], ...trimmedLines].join('\n');
};

const styles = {
  'hljs': {
    display: 'block',
    overflowX: 'auto',
  },
  'hljs-comment': {
    color: '#998',
    fontStyle: 'italic',
  },
  'hljs-quote': {
    color: '#998',
    fontStyle: 'italic',
  },
  'hljs-keyword': {
    color: '#333',
    fontWeight: 'bold',
  },
  'linenumber': {
    color: colorPalette['gray--200'],
  },
  'hljs-selector-tag': {
    color: '#333',
    fontWeight: 'bold',
  },
  'hljs-subst': {
    color: '#333',
    fontWeight: 'normal',
  },
  'hljs-number': {
    color: '#008080',
  },
  'hljs-literal': {
    color: '#008080',
  },
  'hljs-variable': {
    color: '#008080',
  },
  'hljs-template-variable': {
    color: '#008080',
  },
  'hljs-tag .hljs-attr': {
    color: '#008080',
  },
  'hljs-string': {
    color: '#d14',
  },
  'hljs-doctag': {
    color: '#d14',
  },
  'hljs-title': {
    color: '#900',
    fontWeight: 'bold',
  },
  'hljs-section': {
    color: '#900',
    fontWeight: 'bold',
  },
  'hljs-selector-id': {
    color: '#900',
    fontWeight: 'bold',
  },
  'hljs-type': {
    color: '#458',
    fontWeight: 'bold',
  },
  'hljs-class .hljs-title': {
    color: '#458',
    fontWeight: 'bold',
  },
  'hljs-tag': {
    color: '#000080',
    fontWeight: 'normal',
  },
  'hljs-name': {
    color: '#000080',
    fontWeight: 'normal',
  },
  'hljs-attribute': {
    color: '#000080',
    fontWeight: 'normal',
  },
  'hljs-regexp': {
    color: '#009926',
  },
  'hljs-link': {
    color: '#009926',
  },
  'hljs-symbol': {
    color: '#990073',
  },
  'hljs-bullet': {
    color: '#990073',
  },
  'hljs-built_in': {
    color: '#0086b3',
  },
  'hljs-builtin-name': {
    color: '#0086b3',
  },
  'hljs-meta': {
    color: '#999',
    fontWeight: 'bold',
  },
  'hljs-deletion': {
    background: '#fdd',
  },
  'hljs-addition': {
    background: '#dfd',
  },
  'hljs-emphasis': {
    fontStyle: 'italic',
  },
  'hljs-strong': {
    fontWeight: 'bold',
  },
} as const;

export { CodeSnippet };
