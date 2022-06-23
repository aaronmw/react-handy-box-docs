export { getServerSideProps as getStaticProps } from '@/utilities/getServerSideProps';
export { default } from '../index';

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          componentName: 'box',
        },
      },
      {
        params: {
          componentName: 'color',
        },
      },
    ],
    fallback: false, // false or 'blocking'
  };
}
