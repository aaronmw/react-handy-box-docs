import { createContext, useCallback, useContext, useEffect } from "react";

type DOMWatcherContextObject = {
  addDOMWatcher: (watcher: () => void) => void;
  removeDOMWatcher: (watcher: () => void) => void;
};

const DOMWatcherContext = createContext<DOMWatcherContextObject>({
  addDOMWatcher: () => null,
  removeDOMWatcher: () => null,
});

// We can just keep the watchers in a global array;
// Storing them in state or context causes re-renders
const watchers = { current: [] };

export const DOMWatcherProvider = ({ children }) => {
  useEffect(() => {
    const executeAllWatchers = () => {
      watchers.current.forEach((watcher) => {
        watcher();
      });
    };

    const timer = setInterval(executeAllWatchers, 250);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addDOMWatcher = useCallback((watcher) => {
    watchers.current.push(watcher);
  }, []);

  const removeDOMWatcher = useCallback((watcher) => {
    watchers.current = watchers.current.filter((v) => v !== watcher);
  }, []);

  const watcherContext: DOMWatcherContextObject = {
    addDOMWatcher,
    removeDOMWatcher,
  };

  return (
    <DOMWatcherContext.Provider value={watcherContext}>
      {children}
    </DOMWatcherContext.Provider>
  );
};

export const useDOMWatcher: () => DOMWatcherContextObject = () =>
  useContext(DOMWatcherContext);
