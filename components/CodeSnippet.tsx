import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  ThemeObject,
} from '@/react-handy-box/components/Box.types';
import { colorCodesBySwatchName } from '@/tokens/colorPalette';
import { trimEnd } from 'lodash';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useTheme } from 'styled-components';

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
  const theme = useTheme() as ThemeObject;

  const trimmedCodeSnippet = removeIndentation(children);

  const patchedCodeSnippet = Object.keys(codeReplacements).reduce(
    (acc, needle) =>
      acc.replace(
        new RegExp(needle, 'gm'),
        codeReplacements[needle as keyof typeof codeReplacements]
      ),
    trimmedCodeSnippet
  );

  const themedHighlightedLineStyles = getThemedHighlightedLineStyles({
    theme: theme!,
  });

  const themedSyntaxHighlighterStyles = getThemedSyntaxHighlighterStyles({
    theme: theme!,
  });

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

const getThemedHighlightedLineStyles = ({ theme }: { theme: ThemeObject }) => ({
  backgroundColor: colorCodesBySwatchName[theme!['highlighted']],
  borderRadius: '4px',
  display: 'block',
});

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

const getThemedSyntaxHighlighterStyles = ({ theme }: { theme: ThemeObject }) =>
  ({
    'code[class*="language-"]': stylesForCodeAndPre,
    'pre[class*="language-"]': {
      ...stylesForCodeAndPre,
      overflow: 'auto',
    },
    'comment': {
      color: colorCodesBySwatchName[theme!['codeSnippet--comment']],
      fontStyle: 'italic',
    },
    'prolog': {
      color: colorCodesBySwatchName[theme!['codeSnippet--comment']],
      fontStyle: 'italic',
    },
    'doctype': {
      color: colorCodesBySwatchName[theme!['codeSnippet--comment']],
      fontStyle: 'italic',
    },
    'cdata': {
      color: colorCodesBySwatchName[theme!['codeSnippet--comment']],
      fontStyle: 'italic',
    },
    'namespace': {
      opacity: '0.7',
    },
    'string': {
      color: colorCodesBySwatchName[theme!['codeSnippet--string']],
    },
    'attr-value': {
      color: colorCodesBySwatchName[theme!['codeSnippet--string']],
    },
    'punctuation': {},
    'operator': {},
    'entity': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'url': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'symbol': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'number': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'boolean': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'variable': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'constant': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'property': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'regex': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'inserted': {
      color: colorCodesBySwatchName[theme!['codeSnippet--numbers']],
    },
    'atrule': {
      color: colorCodesBySwatchName[theme!['codeSnippet--keyword']],
    },
    'keyword': {
      color: colorCodesBySwatchName[theme!['codeSnippet--keyword']],
    },
    'attr-name': {
      color: colorCodesBySwatchName[theme!['codeSnippet--keyword']],
    },
    '.language-autohotkey .token.selector': {
      color: colorCodesBySwatchName[theme!['codeSnippet--keyword']],
    },
    'function': {
      color: colorCodesBySwatchName[theme!['codeSnippet--function']],
      fontWeight: 'bold',
    },
    'deleted': {
      color: colorCodesBySwatchName[theme!['codeSnippet--function']],
    },
    '.language-autohotkey .token.tag': {
      color: colorCodesBySwatchName[theme!['codeSnippet--function']],
    },
    'tag': {
      color: colorCodesBySwatchName[theme!['codeSnippet--tags']],
    },
    'selector': {
      color: colorCodesBySwatchName[theme!['codeSnippet--tags']],
    },
    '.language-autohotkey .token.keyword': {
      color: colorCodesBySwatchName[theme!['codeSnippet--tags']],
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
  } as const);

export { CodeSnippet };
