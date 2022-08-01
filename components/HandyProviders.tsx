import { GlobalStyles } from '@/components/GlobalStyles';
import { ModalLayerProvider } from '@/components/ModalLayer';
import { DOMWatcherProvider } from '@/hooks/useDOMWatcher';
import { ReactNode } from 'react';
import { StyleSheetManager } from 'styled-components';

const HandyProviders = ({ children }: { children: ReactNode }) => {
  return (
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === 'development'}
    >
      <DOMWatcherProvider>
        <ModalLayerProvider>
          <GlobalStyles />

          {children}
        </ModalLayerProvider>
      </DOMWatcherProvider>
    </StyleSheetManager>
  );
};

export { HandyProviders };
