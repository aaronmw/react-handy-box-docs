import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import { Demo } from '@/components/Demo';
import { GlobalStyles } from '@/components/GlobalStyles';
import { Markdown } from '@/components/Markdown';
import { NavigationItem, NavigationTree } from '@/components/NavigationTree';
import { Text } from '@/components/Text';
import { select } from '@/utilities/select';
import sortBy from 'lodash/sortBy';
import type { NextPage } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheetManager } from 'styled-components';

Router.events.on('routeChangeError', (err, url, { shallow }) => {
  console.log('Navigating to: ' + 'url: ' + url, { cancelled: err.cancelled });
});

type DocumentationPageDescriptor = {
  title: string;
  description: string;
  demos: Array<DocumentationSectionDescriptor>;
};

type DocumentationSectionDescriptor = {
  description?: string;
  highlightLines?: Array<number> | ((value: any) => Array<number>);
  propsForContainer?: BoxProps<'div'>;
  renderDemo: (value: any) => JSX.Element;
  renderSnippet?: ((value: any) => string) | boolean;
  title: string;
  values?: Array<any>;
};

const Home: NextPage<{
  navigationTree: Array<NavigationItem>;
}> = ({ navigationTree }) => {
  const scrollingContentElementRef = useRef<HTMLDivElement>(null);
  const [pageData, setPageData] = useState<DocumentationPageDescriptor>();
  const isLoading = !pageData;
  const router = useRouter();
  const { componentName } = router.query;
  const { pathname = '', hash = '' } =
    typeof window !== 'undefined' ? window.location : {};

  useEffect(() => {
    const timer = setInterval(() => {
      const headingElement = select(hash);

      if (headingElement) {
        console.log(`Scrolling to element:`, headingElement);

        headingElement.scrollIntoView({
          behavior: 'smooth',
        });

        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [hash]);

  useEffect(() => {
    scrollingContentElementRef.current?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const loadPageData = async () => {
      const docFile = await import(`docs/${componentName}`);

      setPageData(docFile.default);
    };

    loadPageData();
  }, [componentName]);

  const renderedDemos = useMemo(() => {
    if (!pageData?.demos) {
      return [];
    }

    return sortBy(pageData.demos, 'title').map((demo, index) => (
      <Demo key={index} {...demo} />
    ));
  }, [pageData]);

  return (
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === 'development'}
    >
      <>
        <Head>
          <title>Handy Box</title>
          <meta name="description" content="Generated by create next app" />
        </Head>

        <Script
          src="https://kit.fontawesome.com/401fb1e734.js"
          data-auto-replace-svg="nest"
        ></Script>

        <GlobalStyles />

        <Box columns={['250px', '1fr']} height="100vh">
          <Box
            as="nav"
            backgroundColor="shaded"
            borderRight="hairline"
            height="100%"
            overflowY="auto"
          >
            <Box
              alignItems="center"
              backgroundColor="shaded"
              backgroundColorLightness={600}
              color="white"
              justifyContent="space-between"
              paddingX="tight"
              paddingY="xtight"
            >
              <Box fontWeight="bold">react-handy-box</Box>
              <Box fontSize="small" opacity={0.6}>
                v0.1.0
              </Box>
            </Box>

            <NavigationTree data={navigationTree} />
          </Box>
          <Box
            alignItems={isLoading ? 'center' : undefined}
            backgroundColor={isLoading ? 'shaded' : undefined}
            justifyContent={isLoading ? 'center' : undefined}
            height="100%"
            overflowY="auto"
            ref={scrollingContentElementRef}
            scrollPaddingTop={50}
          >
            {isLoading && <Box>Loading...</Box>}
            {!isLoading && (
              <Box
                marginX="auto"
                maxWidth={1200}
                padding="loose"
                rowGap="loose"
              >
                <Text variant="heading--2">{pageData.title}</Text>
                <Box rowGap="loose">
                  {pageData.description && (
                    <Markdown children={pageData.description} />
                  )}

                  <Box rowGap="xloose">{renderedDemos}</Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </>
    </StyleSheetManager>
  );
};

export { getServerSideProps as getStaticProps } from '../utilities/getServerSideProps';
export type { DocumentationPageDescriptor, DocumentationSectionDescriptor };
export default Home;
