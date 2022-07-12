import Mousetrap, { ExtendedKeyboardEvent } from "mousetrap";
import { RefObject, useEffect, useRef } from "react";

type KeyName =
  | "shift"
  | "ctrl"
  | "alt"
  | "meta"
  | "option"
  | "command"
  | "backspace"
  | "tab"
  | "enter"
  | "return"
  | "capslock"
  | "esc"
  | "escape"
  | "space"
  | "pageup"
  | "pagedown"
  | "end"
  | "home"
  | "left"
  | "up"
  | "right"
  | "down"
  | "ins"
  | "del"
  | "plus";

/**
   An object keyed by one or more key combos supported by
   [Mousetrap](https://craig.is/killing/mice). Ex:

   ```javascript
   {
     'left': (e, combo) => { ... },
     'up, down': (e, combo) => { ... },
     'option+command+s, command+k s': (e, combo) => { ... }
   }
   ```

   Each handler receives two arguments: `e` the event and `combo` a string
   containing the key(s) pressed.

   Supported keys: `shift`, `ctrl`, `alt`, `meta`, `option`, `command`,
   `backspace`, `tab`, `enter`, `return`, `capslock`, `esc`, `escape`, `space`,
   `pageup`, `pagedown`, `end`, `home`, `left`, `up`, `right`, `down`, `ins`,
   `del`, `plus`
*/
export type KeyMap = {
  [combo: KeyName | string]: (
    event: ExtendedKeyboardEvent,
    combo: string
  ) => void;
};

export const useKeyboardShortcuts: (
  keyMap: KeyMap,
  node?: HTMLElement | RefObject<HTMLElement> | null
) => void = (keyMap, node) => {
  const mousetrapInstance = useRef<Mousetrap.MousetrapInstance>();

  useEffect(() => {
    let parentNode = node;

    if (parentNode && "current" in parentNode) {
      if (!parentNode.current) {
        return;
      }

      parentNode = parentNode.current as HTMLElement;
    }

    if (parentNode === null) {
      return;
    }

    mousetrapInstance.current = new Mousetrap(parentNode ?? document.body);

    Object.entries(keyMap).forEach(([combo, handler]) => {
      combo.split(",").map((singleCombo) => {
        mousetrapInstance.current?.bind(singleCombo.trim(), handler);
      });
    });

    return () => {
      mousetrapInstance.current?.reset();
    };
  }, [keyMap, node]);

  return mousetrapInstance.current;
};
