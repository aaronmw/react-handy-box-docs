import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { trimEnd } from 'lodash';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type CodeSnippetProps = Omit<BoxPropsWithoutRef, 'children'> & {
  children: string;
  highlightLines?: Array<number>;
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

  const patchedCodeSnippet = Object.keys(codeReplacements).reduce(
    (acc, needle) =>
      acc.replace(
        new RegExp(needle, 'gm'),
        codeReplacements[needle as keyof typeof codeReplacements]
      ),
    trimmedCodeSnippet
  );

  return (
    <Box
      styles={{ fontFamily: 'monospace', overflow: 'auto', ...styles }}
      {...otherProps}
    >
      <SyntaxHighlighter
        language="jsx"
        lineNumberStyle={{ display: 'none' }}
        lineProps={(lineNumber) => {
          const isHighlightedLine = highlightLines.includes(lineNumber);

          return {
            style: isHighlightedLine ? themedHighlightedLineStyles : {},
          };
        }}
        showLineNumbers={true}
        style={themedSyntaxHighlighterStyles}
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

const themedHighlightedLineStyles = {
  backgroundColor: 'var(--color--background--highlighted)',
  borderRadius: '4px',
  display: 'block',
};

const stylesForCodeAndPre = {
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
} as const;

const themedSyntaxHighlighterStyles = {
  'code[class*="language-"]': stylesForCodeAndPre,
  'pre[class*="language-"]': {
    ...stylesForCodeAndPre,
    overflow: 'auto',
  },
  'comment': {
    color: 'var(--color--code--comment)',
    fontStyle: 'italic',
  },
  'prolog': {
    color: 'var(--color--code--comment)',
    fontStyle: 'italic',
  },
  'doctype': {
    color: 'var(--color--code--comment)',
    fontStyle: 'italic',
  },
  'cdata': {
    color: 'var(--color--code--comment)',
    fontStyle: 'italic',
  },
  'namespace': {
    opacity: '0.7',
  },
  'string': {
    color: 'var(--color--code--string)',
  },
  'attr-value': {
    color: 'var(--color--code--string)',
  },
  'punctuation': {},
  'operator': {},
  'entity': {
    color: 'var(--color--code--numbers)',
  },
  'url': {
    color: 'var(--color--code--numbers)',
  },
  'symbol': {
    color: 'var(--color--code--numbers)',
  },
  'number': {
    color: 'var(--color--code--numbers)',
  },
  'boolean': {
    color: 'var(--color--code--numbers)',
  },
  'variable': {
    color: 'var(--color--code--numbers)',
  },
  'constant': {
    color: 'var(--color--code--numbers)',
  },
  'property': {
    color: 'var(--color--code--numbers)',
  },
  'regex': {
    color: 'var(--color--code--numbers)',
  },
  'inserted': {
    color: 'var(--color--code--numbers)',
  },
  'atrule': {
    color: 'var(--color--code--keyword)',
  },
  'keyword': {
    color: 'var(--color--code--keyword)',
  },
  'attr-name': {
    color: 'var(--color--code--keyword)',
  },
  '.language-autohotkey .token.selector': {
    color: 'var(--color--code--keyword)',
  },
  'function': {
    color: 'var(--color--code--function)',
    fontWeight: 'bold',
  },
  'deleted': {
    color: 'var(--color--code--function)',
  },
  '.language-autohotkey .token.tag': {
    color: 'var(--color--code--function)',
  },
  'tag': {
    color: 'var(--color--code--tags)',
  },
  'selector': {
    color: 'var(--color--code--tags)',
  },
  '.language-autohotkey .token.keyword': {
    color: 'var(--color--code--tags)',
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
};

export { CodeSnippet };
