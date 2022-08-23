import { Demo } from '@/components/Demo';
import { Markdown } from '@/components/Markdown';
import { NavigationItem, NavigationTree } from '@/components/NavigationTree';
import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { HandyProviders } from '@/react-handy-box/components/HandyProviders';
import { Text } from '@/react-handy-box/components/Text';
import { select } from '@/react-handy-box/utilities/select';
import startCase from 'lodash/startCase';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';

type DocumentationPageDescriptor = {
  title: string;
  description?: string;
  demos: Array<DocumentationSectionDescriptor>;
};

type DocumentationSectionDescriptor = {
  description?: string;
  highlightLines?: Array<number> | ((value: any) => Array<number>);
  propsForContainer?: BoxProps;
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
  const { componentName = 'box' } = router.query;
  const { pathname = '', hash = '' } =
    typeof window !== 'undefined' ? window.location : {};

  useEffect(() => {
    const timer = setInterval(() => {
      const headingElement = select(hash);

      if (headingElement) {
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
      const docFile = await import(
        `docs/${startCase(componentName as string).replace(' ', '')}.docs`
      );

      setPageData(docFile.default);
    };

    loadPageData();
  }, [componentName]);

  const renderedDemos = useMemo(() => {
    if (!pageData?.demos) {
      return [];
    }

    return pageData.demos.map((demo, index) => <Demo key={index} {...demo} />);
  }, [pageData]);

  return (
    <HandyProviders>
      <Head>
        <title>Handy Box</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Script
        src="https://kit.fontawesome.com/401fb1e734.js"
        data-auto-replace-svg="nest"
      ></Script>

      <Box
        styles={{
          columns: ['250px', '1fr'],
          height: '100vh',
        }}
      >
        <Box
          as="nav"
          styles={{
            backgroundColor: 'shaded',
            borderRight: 'hairline',
            height: '100%',
            overflowY: 'auto',
            paddingBottom: 'xxloose',
          }}
        >
          <Box
            styles={{
              alignItems: 'center',
              backgroundColor: 'shaded',
              backgroundColorOpacity: 100,
              backgroundColorLightness: 600,
              color: 'white',
              justifyContent: 'space-between',
              paddingX: 'tight',
              paddingY: 'xtight',
            }}
          >
            <Box styles={{ fontWeight: 'bold' }}>react-handy-box</Box>
            <Box styles={{ fontSize: 'small', opacity: 0.6 }}>v0.1.0</Box>
          </Box>

          <NavigationTree data={navigationTree} />
        </Box>

        <Box
          ref={scrollingContentElementRef}
          styles={{
            alignItems: isLoading ? 'center' : undefined,
            backgroundColor: isLoading ? 'shaded' : undefined,
            justifyContent: isLoading ? 'center' : undefined,
            height: '100%',
            overflowY: 'auto',
            scrollPaddingTop: 50,
          }}
        >
          {isLoading && <Box>Loading...</Box>}
          {!isLoading && (
            <Box
              styles={{
                marginX: 'auto',
                maxWidth: 1200,
                padding: 'loose',
                rowGap: 'loose',
              }}
            >
              <Text variant="heading--2">{pageData.title}</Text>

              <Box styles={{ rowGap: 'loose' }}>
                {pageData.description && (
                  <Markdown>{pageData.description}</Markdown>
                )}

                <Box styles={{ rowGap: 'xloose' }}>{renderedDemos}</Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </HandyProviders>
  );
};

export { getServerSideProps as getStaticProps } from '@/utilities/getServerSideProps';
export type { DocumentationPageDescriptor, DocumentationSectionDescriptor };

export default Home;
