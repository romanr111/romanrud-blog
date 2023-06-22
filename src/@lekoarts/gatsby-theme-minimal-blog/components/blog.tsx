/** @jsx jsx */
import { jsx, Heading, Flex } from 'theme-ui';
import { Link } from 'gatsby';
import Layout from './layout';
import Listing from './listing';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import replaceSlashes from '../utils/replaceSlashes';
import { useTranslation } from 'react-i18next';

type POST = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  timeToRead?: number;
  ns: string;
  tags?: {
    name: string;
    slug: string;
  }[];
};
export type MBBlogProps = {
  data: { allPost: { nodes: POST[] } };
};

const Blog = (props: MBBlogProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const { allPost } = props?.data;
  const { t } = useTranslation('blog.index');
  const title = t('title');
  return (
    <Layout title={title}>
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          {t('Блог')}
        </Heading>
        <Link
          sx={(t) => ({
            ...t.styles?.a,
            variant: `links.secondary`,
            marginY: 2,
          })}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          {t('all_tags')}
        </Link>
      </Flex>
      <Listing posts={allPost?.nodes} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Blog;
