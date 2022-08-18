import fs from 'fs';
import kebabCase from 'lodash/kebabCase';
import path from 'path';

export { getServerSideProps as getStaticProps } from '@/utilities/getServerSideProps';
export { default } from '../index';

export async function getStaticPaths() {
  const docsDirectory = path.join(process.cwd(), 'docs');

  const docFiles = fs.readdirSync(docsDirectory);

  return {
    paths: docFiles.map((fileName) => ({
      params: {
        componentName: kebabCase(fileName.split('.')[0]),
      },
    })),
    fallback: false, // false or 'blocking'
  };
}
