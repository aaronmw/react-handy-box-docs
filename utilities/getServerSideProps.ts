import { NavigationItem } from '@/components/NavigationTree';
import fs from 'fs';
import kebabCase from 'lodash/kebabCase';
import sortBy from 'lodash/sortBy';
import path from 'path';
import { DocumentationPageDescriptor } from '../pages';

export async function getServerSideProps() {
  const docsDirectory = path.join(process.cwd(), 'docs');

  const docFiles = fs.readdirSync(docsDirectory);

  const navigationTree: Array<NavigationItem> = await Promise.all(
    docFiles.map(async (docFileName) => {
      const docFile = await import(`docs/${docFileName}`);
      const docDescriptor = docFile.default as DocumentationPageDescriptor;

      return {
        href: `/docs/${kebabCase(docDescriptor.title)}`,
        subSections: sortBy(
          docDescriptor.demos.map((demo) => ({
            href: `/docs/${kebabCase(docDescriptor.title)}#${kebabCase(
              demo.title
            )}`,
            title: demo.title,
          })),
          'title'
        ),
        title: docDescriptor.title,
      } as NavigationItem;
    })
  );

  return {
    props: { navigationTree },
  };
}
