import { ThemeName } from '@/react-handy-box/components/Box.types';
import { GlobalStyles } from '@/react-handy-box/components/GlobalStyles';
import { ModalLayerProvider } from '@/react-handy-box/components/ModalLayer';
import { DOMWatcherProvider } from '@/react-handy-box/hooks/useDOMWatcher';
import { useLocalStorage } from '@/react-handy-box/hooks/useLocalStorage';
import { themes } from '@/tokens/colorPalette';
import { ReactNode, useEffect, useState } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

export type HandyProviderRenderProps = {
  themeName: ThemeName;
  setThemeName: (newActiveThemeName: ThemeName) => void;
};

const HandyProviders = ({
  children,
}: {
  children: (renderProps: HandyProviderRenderProps) => ReactNode;
}) => {
  const [hasLoadedStoredTheme, setHasLoadedStoredTheme] = useState(false);

  const [activeThemeName, setActiveThemeName] = useState<ThemeName>('light');

  const [storedThemeName, setStoredThemeName] = useLocalStorage<ThemeName>(
    'activeThemeName',
    'light'
  );

  useEffect(() => {
    if (!hasLoadedStoredTheme) {
      if (activeThemeName !== storedThemeName) {
        setActiveThemeName(storedThemeName);
      }

      setHasLoadedStoredTheme(true);
    } else {
      setStoredThemeName(activeThemeName);
    }
  }, [
    activeThemeName,
    hasLoadedStoredTheme,
    setStoredThemeName,
    storedThemeName,
  ]);

  return (
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === 'development'}
    >
      <ThemeProvider theme={themes[activeThemeName]}>
        <DOMWatcherProvider>
          <GlobalStyles theme={themes[activeThemeName]} />
          <ModalLayerProvider>
            {children({
              themeName: activeThemeName,
              setThemeName: setActiveThemeName,
            })}
          </ModalLayerProvider>
        </DOMWatcherProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export { HandyProviders };
