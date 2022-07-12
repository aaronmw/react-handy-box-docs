import { ModalLayerProvider } from "@/components/ModalLayer";
import { ReactNode } from "react";
import { StyleSheetManager } from "styled-components";

const HandyProviders = ({ children }: { children: ReactNode }) => {
  return (
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === "development"}
    >
      <ModalLayerProvider>{children}</ModalLayerProvider>
    </StyleSheetManager>
  );
};

export { HandyProviders };
