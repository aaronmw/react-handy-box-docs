import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';

type DOMWatcher = () => void;

type DOMWatcherContextObject = {
  addDOMWatcher: (watcher: DOMWatcher) => void;
  removeDOMWatcher: (watcher: DOMWatcher) => void;
};

const DOMWatcherContext = createContext<DOMWatcherContextObject>({
  addDOMWatcher: () => null,
  removeDOMWatcher: () => null,
});

// We can just keep the watchers in a global array;
// Storing them in state or context causes re-renders
const watchers: MutableRefObject<Array<DOMWatcher>> = { current: [] };

export const DOMWatcherProvider = ({ children }: { children: ReactNode }) => {
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

  const addDOMWatcher = useCallback((watcher: DOMWatcher) => {
    watchers.current.push(watcher);
  }, []);

  const removeDOMWatcher = useCallback((watcher: DOMWatcher) => {
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
