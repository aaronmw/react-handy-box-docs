import { ThemeName } from '@/react-handy-box/components/Box.types';
import {
  GlobalAnimations,
  GlobalStyles,
} from '@/react-handy-box/components/GlobalStyles';
import { ModalLayerProvider } from '@/react-handy-box/components/ModalLayer';
import { GlobalIntervalProvider } from '@/react-handy-box/hooks/useGlobalInterval';
import { themes } from '@/tokens/colorPalette';
import { ReactNode } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

export type HandyProviderRenderProps = {
  activeThemeName: ThemeName;
  setThemeName: (newActiveThemeName: ThemeName) => void;
};

const HandyProviders = ({
  activeThemeName = 'light',
  children,
  disableVendorPrefixesInDevMode = true,
}: {
  activeThemeName?: ThemeName;
  children: ReactNode;
  disableVendorPrefixesInDevMode?: boolean;
}) => {
  return (
    <StyleSheetManager
      disableVendorPrefixes={
        disableVendorPrefixesInDevMode
          ? process.env.NODE_ENV === 'development'
          : undefined
      }
    >
      <ThemeProvider theme={themes[activeThemeName]}>
        <GlobalIntervalProvider>
          <GlobalAnimations />
          <GlobalStyles theme={themes[activeThemeName]} />
          <ModalLayerProvider>{children}</ModalLayerProvider>
        </GlobalIntervalProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export { HandyProviders };
