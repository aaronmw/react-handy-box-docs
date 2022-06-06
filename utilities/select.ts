const select = (selector: string, parentNode: HTMLElement = document.body) =>
  parentNode.querySelector(selector);

const selectAll = (selector: string, parentNode: HTMLElement = document.body) =>
  Array.from(parentNode.querySelectorAll(selector));

export { select, selectAll };
