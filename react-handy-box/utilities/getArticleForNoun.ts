const getArticleForNoun = (noun: string) =>
  `${'aeiouAEIOU'.includes(noun[0]) ? 'an' : 'a'} ${noun}`;

export { getArticleForNoun };
