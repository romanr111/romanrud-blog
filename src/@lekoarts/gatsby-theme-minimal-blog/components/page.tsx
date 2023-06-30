/** @jsx jsx */
import type { HeadFC, PageProps } from 'gatsby';
import { jsx, Heading } from 'theme-ui';
import Layout from './layout';
import Seo from './seo';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type MBPageProps = {
  page: {
    title: string;
    slug: string;
    excerpt: string;
    ns: string;
  };
};

type PageContext = {
  frontmatter: { ns: string };
};

const Page: React.FC<
  React.PropsWithChildren<PageProps<MBPageProps, PageContext>>
> = ({ children, data }) => {
  const page = data?.page;
  const ns = page?.ns;

  const { t } = useTranslation(ns);

  const title = t('title');
  const description = t('description');

  return (
    <Layout title={title} description={description}>
      <Heading as="h2" variant="styles.h2">
        {t('title')}
      </Heading>
      <section sx={{ my: 5, variant: `layout.content` }}>{children}</section>
    </Layout>
  );
};

export default Page;
