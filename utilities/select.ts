const select = (selector: string, parentNode: HTMLElement = document.body) =>
  !selector ? null : parentNode.querySelector(selector);

const selectAll = (selector: string, parentNode: HTMLElement = document.body) =>
  !selector ? null : Array.from(parentNode.querySelectorAll(selector));

export { select, selectAll };
