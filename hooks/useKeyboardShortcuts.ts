import Mousetrap from 'mousetrap';
import * as React from 'react';

type KeyName =
  | 'shift'
  | 'ctrl'
  | 'alt'
  | 'meta'
  | 'option'
  | 'command'
  | 'backspace'
  | 'tab'
  | 'enter'
  | 'return'
  | 'capslock'
  | 'esc'
  | 'escape'
  | 'space'
  | 'pageup'
  | 'pagedown'
  | 'end'
  | 'home'
  | 'left'
  | 'up'
  | 'right'
  | 'down'
  | 'ins'
  | 'del'
  | 'plus';

type KeyMap = {
  [combo: KeyName | string]: Parameters<Mousetrap.MousetrapStatic['bind']>[1];
};

export const useKeyboardShortcuts: (
  keyMap: KeyMap,
  node?: HTMLElement | React.RefObject<HTMLElement>
) => void = (keyMap, node) => {
  const mousetrapInstance = React.useRef<Mousetrap.MousetrapInstance>();

  React.useEffect(() => {
    let parentNode = node;

    if (parentNode && 'current' in parentNode) {
      if (!parentNode.current) {
        return;
      }

      parentNode = parentNode.current;
    }

    mousetrapInstance.current = new Mousetrap(
      (parentNode as HTMLElement) || document?.body
    );

    Object.entries(keyMap).forEach(([combo, handler]) => {
      mousetrapInstance.current?.bind(combo, handler);
    });

    return () => {
      mousetrapInstance.current?.reset();
    };
  }, [keyMap, node]);

  return mousetrapInstance.current;
};
