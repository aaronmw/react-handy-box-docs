import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { StyleSheetManager } from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  GlobalStyles,
  Icon,
  PhraseCycler,
  Text,
} from '../components';
import { BoxProps } from '../components/Box.types';

const Home: NextPage = () => {
  return (
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === 'development'}
    >
      <>
        <Head>
          <title>Interchain Security by Informal Systems</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Script
          src="https://kit.fontawesome.com/401fb1e734.js"
          data-auto-replace-svg="nest"
        ></Script>

        <GlobalStyles />

        <FancyBackgroundBox
          alignItems="center"
          flexGrow={1}
          height="100vh"
          overflow="hidden"
          rowGap={0}
        >
          <ContentContainer>
            <Anchor
              alignItems="center"
              href="https://informal.systems"
              justifyContent="space-between"
              paddingY="normal"
            >
              <Image
                alt="Informal Systems Logo"
                height={50}
                src="/logo.informal.png"
                width={138}
              />
            </Anchor>
          </ContentContainer>

          <Box
            propsForTabletOrLarger={{
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
            }}
            position="relative"
            width="100%"
          >
            <ContentContainer paddingY="xloose" zIndex={1}>
              <Box
                rowGap="xloose"
                alignItems="flex-start"
                propsForTabletOrLarger={{
                  width: '50%',
                }}
              >
                <Text as="h2" variant="heading--1">
                  Launch your project to the entire Cosmos and enjoy instant{' '}
                  <PhraseCycler
                    color="brand"
                    fontWeight={900}
                    phrases={['security.', 'community.', 'liquidity.']}
                  />
                </Text>

                <Button>Get started today</Button>
              </Box>
            </ContentContainer>

            <Box
              propsForTabletOrLarger={{
                position: 'absolute',
                right: -200,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 0,
              }}
            >
              <Image
                alt="Interchain Security Diagram"
                height={638}
                layout="fixed"
                src="/interchain-security-diagram.png"
                width={851}
              />
            </Box>
          </Box>

          <Box alignItems="center" rowGap="xtight" width="100%">
            <Text as="p" variant="label">
              Brought to you by the builders of:
            </Text>
            <Box
              as="ul"
              filter="grayscale(1)"
              flexWrap="wrap"
              gap="normal"
              justifyContent="space-evenly"
              opacity={0.6}
              padding="loose"
              width="100%"
            >
              {[
                {
                  logo: 'logo.cosmos-sdk.png',
                  logoHeight: 80,
                  logoWidth: 318,
                  name: 'Cosmos-SDK',
                },
                {
                  logo: 'logo.tendermint.png',
                  logoHeight: 80,
                  logoWidth: 293,
                  name: 'Tendermint',
                },
                {
                  logo: 'logo.ibc.png',
                  logoHeight: 80,
                  logoWidth: 308,
                  name: 'Inter-Blockchain Communication (IBC)',
                },
                {
                  logo: 'logo.cosmos-hub.png',
                  logoHeight: 80,
                  logoWidth: 315,
                  name: 'CosmosHub',
                },
                {
                  logo: 'logo.cosmwasm.png',
                  logoHeight: 80,
                  logoWidth: 351,
                  name: 'CosmWasm',
                },
              ].map((project) => (
                <Box as="li" key={project.name} width={200}>
                  <Image
                    alt={`${project.name} Logo`}
                    height={project.logoHeight}
                    layout="responsive"
                    src={`/${project.logo}`}
                    width={project.logoWidth}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </FancyBackgroundBox>

        <Box paddingY="xxloose" rowGap="xxloose">
          <ContentContainer
            alignItems="center"
            rowGap="loose"
            propsForTabletOrLarger={{
              paddingX: 'xloose',
            }}
          >
            <Text variant="heading--2">Key Features</Text>

            <Box columnGap="xloose" columns={2} width="100%">
              <Text
                borderBottom="hairline"
                paddingBottom="loose"
                variant="heading--3"
              >
                Before
              </Text>
              <Text
                borderBottom="hairline"
                paddingBottom="loose"
                variant="heading--3"
              >
                After
              </Text>
            </Box>

            {[
              [
                `Putting together a validator set can take months and is a distraction from building a community of engaged users.`,
                `At launch, consumer chains are secured by the full validator set and multi-billion dollar market cap of the Cosmos Hub.`,
              ],
              [
                `Applications built on other Layer 1s compete with one another for blockspace.`,
                `Your own appchain means no unexpected congestion and no competition for blockspace, giving you the certainty to innovate.`,
              ],
              [
                `A lack of clear alignment with the stakeholders of a protocol can complicate go-to-market.`,
                `Now, projects get immediate access to hundreds of thousands of active users and benefit from Cosmos network effects over time.`,
              ],
            ].map(([before, after], index) => (
              <Box
                columnGap="normal"
                columns={2}
                key={index}
                propsForTabletOrLarger={{
                  columnGap: 'xloose',
                  display: 'grid',
                }}
              >
                <Box columnGap="normal">
                  <Icon name="bolt-lightning" variant="solid" />
                  <Box>{before}</Box>
                </Box>
                <Box columnGap="normal">
                  <Icon name="bolt-lightning" variant="solid" />
                  <Box>{after}</Box>
                </Box>
              </Box>
            ))}
          </ContentContainer>

          <ContentContainer>
            <FancyBackgroundBox
              borderRadius="normal"
              padding="xloose"
              rowGap="normal"
            >
              <Box rowGap="xtight">
                <Text variant="label">Featured Project:</Text>
                <Text variant="heading--2">Quicksilver</Text>
              </Box>
              <Box
                alignItems="center"
                flexDirection="column"
                gap="normal"
                propsForTabletOrLarger={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  QuickSilver is a liquid staking zone built for the Cosmos
                  ecosystem.
                </Box>
                <Button>Learn More</Button>
              </Box>
            </FancyBackgroundBox>
          </ContentContainer>

          <ContentContainer
            rowGap="xloose"
            propsForTabletOrLarger={{
              alignItems: 'center',
              display: 'grid',
              columnGap: 'xloose',
              columns: 2,
            }}
          >
            <Box rowGap="loose">
              <Text variant="heading--2">
                Building with Interchain Security
              </Text>
              <Box rowGap="normal">
                {[
                  `Fully custom chain binary at the Cosmos-SDK level allows projects complete control of how gas is metered and how transactions are assembled into blocks.`,
                  `Custom inflationary and fee token sent to the Cosmos Hub in exchange for high security`,
                  `Continuous airdrops to Comos Hub delegators and validators in the native fee token`,
                ].map((phrase, index) => (
                  <Box alignItems="flex-start" columnGap="normal" key={index}>
                    <Box
                      alignItems="center"
                      backgroundColor="shaded"
                      borderRadius="normal"
                      justifyContent="center"
                      padding="normal"
                    >
                      <Icon name="check" />
                    </Box>
                    <Box>{phrase}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Image
              alt="Informal Systems Logo"
              height={457}
              src="/interchain-security-protocol-diagram.png"
              width={611}
            />
          </ContentContainer>

          <ContentContainer rowGap="loose">
            <Text variant="heading--2">Contract Consumer Chains</Text>

            <Box
              rowGap="normal"
              propsForTabletOrLarger={{
                columnGap: 'normal',
                columns: 3,
              }}
            >
              {[
                {
                  icon: 'brain-circuit',
                  content: `Quickly deploy a smart contract application secured by the entire Cosmos Hub`,
                },
                {
                  icon: 'computer-classic',
                  content: (
                    <>
                      EVM and CosmWasm compatibility allow developers to program
                      applications in languages they are comfortable with{' '}
                      <Anchor color="white" href="#">
                        Build with CosmWasm
                      </Anchor>
                    </>
                  ),
                },
                {
                  icon: 'gas-pump',
                  content: `Majority of gas fees go to developer DAO to support long term sustainable development`,
                },
              ].map((contentDescriptor, index) => (
                <FancyBackgroundBox
                  alignItems="center"
                  borderRadius="small"
                  key={index}
                  padding="loose"
                  rowGap="normal"
                >
                  <Box
                    alignItems="center"
                    backgroundColor="white--translucent"
                    borderRadius="circle"
                    justifyContent="center"
                    padding="normal"
                  >
                    <Icon
                      fontSize="large"
                      name={contentDescriptor.icon as any}
                    />
                  </Box>
                  <Box>{contentDescriptor.content}</Box>
                </FancyBackgroundBox>
              ))}
            </Box>
          </ContentContainer>
        </Box>
        <Box backgroundColor="shaded" paddingY="xloose">
          <ContentContainer
            textAlign="center"
            rowGap="loose"
            propsForTabletOrLarger={{
              paddingX: 'xloose',
            }}
          >
            <Text variant="heading--2">Join the Community</Text>

            <Box
              gap="loose"
              propsForTabletOrLarger={{
                columnGap: 'loose',
                columns: 3,
              }}
            >
              {[
                [
                  'twitter',
                  'brands',
                  'Stay up to date on the latest updates from the team.',
                ],
                [
                  'discord',
                  'brands',
                  'Join our testnet and connect with the development team.',
                ],
                [
                  'pencil',
                  'solid',
                  'For updates on Interchain Security development',
                ],
              ].map(([iconName, iconFamily, message], index) => (
                <Box alignItems="center" rowGap="normal" key={index}>
                  <Box
                    alignItems="center"
                    backgroundColor="white"
                    borderRadius="normal"
                    justifyContent="center"
                    padding="normal"
                  >
                    <Icon name={iconName as any} variant={iconFamily as any} />
                  </Box>
                  {message}
                </Box>
              ))}
            </Box>
          </ContentContainer>
        </Box>
      </>
    </StyleSheetManager>
  );
};

const ContentContainer = ({ children, ...otherProps }: BoxProps<'div'>) => (
  <Box marginX="auto" width="80vw" {...otherProps}>
    {children}
  </Box>
);

const FancyBackgroundBox = ({ children, ...otherProps }: BoxProps<'div'>) => (
  <Box color="white" overflow="hidden" position="relative" {...otherProps}>
    {children}

    <Box
      backgroundColor="purple--700"
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      pointerEvents="none"
      zIndex={-1}
    >
      <Box
        backgroundColor="blue"
        borderRadius="100%"
        filter="blur(50px)"
        height="100vh"
        left="-30%"
        opacity={0.3}
        position="absolute"
        top="-20%"
        width="100vh"
      />

      <Box
        backgroundColor="pink"
        borderRadius="100%"
        filter="blur(50px)"
        height="100vh"
        right="-20%"
        opacity={0.3}
        position="absolute"
        bottom="-30%"
        width="100vh"
      />

      <Box
        backgroundColor="teal"
        borderRadius="100%"
        filter="blur(50px)"
        height="100vh"
        left="40%"
        opacity={0.3}
        position="absolute"
        top="-60%"
        width="100vh"
      />
    </Box>
  </Box>
);

export default Home;
