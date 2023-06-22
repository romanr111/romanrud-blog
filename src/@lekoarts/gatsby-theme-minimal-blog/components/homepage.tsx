/** @jsx jsx */
import { jsx } from 'theme-ui';
import { HeadFC, Link, graphql } from 'gatsby';
import Layout from './layout';
import Title from './title';
import Listing from './listing';
import List from './list';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import useSiteMetadata from '../hooks/use-site-metadata';
import replaceSlashes from '../utils/replaceSlashes';
import { visuallyHidden } from '../styles/utils';
import Seo from './seo';
import Hero from '../texts/hero.mdx';
import Bottom from '../texts/bottom.mdx';
import { Translation, useTranslation } from 'gatsby-plugin-react-i18next';

export type MBHomepageProps = {
  data: {
    allPost: {
      nodes: {
        slug: string;
        title: string;
        date: string;
        excerpt: string;
        description: string;
        timeToRead?: number;
        tags?: {
          name: string;
          slug: string;
        }[];
        ns: string;
      }[];
    };
  };
};

const Homepage = ({ data }: MBHomepageProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const { siteTitle } = useSiteMetadata();
  const { t } = useTranslation('home');
  const posts = data?.allPost?.nodes;

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section
        sx={{
          mb: [6, 6, 6],
          p: { fontSize: [1, 2, 3], mt: 2 },
          variant: `section_hero`,
        }}
      >
        <Hero />
      </section>
      <Title text={t('hero_recent_posts')}>
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          {t('see_all')}
        </Link>
      </Title>
      <Listing posts={posts} showTags={false} />
      <List>
        <Bottom />
      </List>
    </Layout>
  );
};

export default Homepage;
