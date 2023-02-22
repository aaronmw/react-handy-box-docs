import trimEnd from 'lodash/trimEnd';

const unindentLines = (code: string) => {
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
    return lines.length === 1 ? lines[0] : code;
  }

  const trimmedLines = lines
    .slice(1)
    .map((line) => line.slice(smallestIndentation));

  return [lines[0], ...trimmedLines].join('\n');
};

export { unindentLines };
