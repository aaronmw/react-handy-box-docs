const indentLines = (lines: string, numSpaces: number = 2): string => {
  const result = lines
    .split('\n')
    .map(
      (line, lineNumber) =>
        `${' '.repeat(lineNumber > 0 ? numSpaces : 0)}${line}`
    )
    .join('\n');

  return result;
};

export { indentLines };
