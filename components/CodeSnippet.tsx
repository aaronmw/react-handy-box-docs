import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { colorPalette } from '@/tokens/colorPalette';
import { trimEnd } from 'lodash';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type CodeSnippetProps = Omit<BoxPropsWithoutRef, 'children'> & {
  children: string;
  highlightLines?: Array<number>;
};

const highlightedLineProps = {
  backgroundColor: colorPalette['yellow--100'],
  display: 'block',
};

const codeReplacements = {
  'styled.div': 'Box',
};

const CodeSnippet = ({
  children,
  highlightLines = [],
  styles,
  ...otherProps
}: CodeSnippetProps) => {
  const trimmedCodeSnippet = removeIndentation(children);
  // const trimmedCodeSnippet = children;
  const patchedCodeSnippet = Object.keys(codeReplacements).reduce(
    (acc, needle) =>
      acc.replace(
        new RegExp(needle, 'gm'),
        codeReplacements[needle as keyof typeof codeReplacements]
      ),
    trimmedCodeSnippet
  );

  return (
    <Box styles={{ fontFamily: 'monospace', ...styles }} {...otherProps}>
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
        style={syntaxHighlighterStyles}
        wrapLines={true}
      >
        {patchedCodeSnippet}
      </SyntaxHighlighter>
    </Box>
  );
};

const removeIndentation = (code: string) => {
  const lines = code.trim().split('\n');

  const smallestIndentation = lines.slice(1).reduce((acc, line) => {
    const trimmedLine = trimEnd(line);

    if (trimmedLine.length === 0) {
      return acc;
    }

    const numLeadingSpaces = trimmedLine.match(/^[ ]*/)![0].length;

    return numLeadingSpaces < acc ? numLeadingSpaces : acc;
  }, Infinity);

  if (smallestIndentation === Infinity || smallestIndentation === 0) {
    return code;
  }

  const trimmedLines = lines
    .slice(1)
    .map((line) => line.slice(smallestIndentation));

  return [lines[0], ...trimmedLines].join('\n');
};

const syntaxHighlighterStyles = {
  'code[class*="language-"]': {
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5em',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5em',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    overflow: 'auto',
  },
  'comment': {
    color: colorPalette['gray--400'],
    fontStyle: 'italic',
  },
  'prolog': {
    color: colorPalette['gray--400'],
    fontStyle: 'italic',
  },
  'doctype': {
    color: colorPalette['gray--400'],
    fontStyle: 'italic',
  },
  'cdata': {
    color: colorPalette['gray--400'],
    fontStyle: 'italic',
  },
  'namespace': {
    opacity: '0.7',
  },
  'string': {
    color: colorPalette['purple--500'],
  },
  'attr-value': {
    color: colorPalette['purple--500'],
  },
  'punctuation': {},
  'operator': {},
  'entity': {
    color: colorPalette['teal--500'],
  },
  'url': {
    color: colorPalette['teal--500'],
  },
  'symbol': {
    color: colorPalette['teal--500'],
  },
  'number': {
    color: colorPalette['teal--500'],
  },
  'boolean': {
    color: colorPalette['teal--500'],
  },
  'variable': {
    color: colorPalette['teal--500'],
  },
  'constant': {
    color: colorPalette['teal--500'],
  },
  'property': {
    color: colorPalette['teal--500'],
  },
  'regex': {
    color: colorPalette['teal--500'],
  },
  'inserted': {
    color: colorPalette['teal--500'],
  },
  'atrule': {
    color: colorPalette['blue--500'],
  },
  'keyword': {
    color: colorPalette['blue--500'],
  },
  'attr-name': {
    color: colorPalette['blue--500'],
  },
  '.language-autohotkey .token.selector': {
    color: colorPalette['blue--500'],
  },
  'function': {
    color: colorPalette['red--500'],
    fontWeight: 'bold',
  },
  'deleted': {
    color: colorPalette['red--500'],
  },
  '.language-autohotkey .token.tag': {
    color: colorPalette['red--500'],
  },
  'tag': {
    color: colorPalette['purple--600'],
  },
  'selector': {
    color: colorPalette['purple--600'],
  },
  '.language-autohotkey .token.keyword': {
    color: colorPalette['purple--600'],
  },
  'important': {
    fontWeight: 'bold',
  },
  'bold': {
    fontWeight: 'bold',
  },
  'italic': {
    fontStyle: 'italic',
  },
} as const;

export { CodeSnippet };
