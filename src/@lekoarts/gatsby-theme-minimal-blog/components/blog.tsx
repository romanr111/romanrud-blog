/** @jsx jsx */
import { jsx, Heading, Flex } from 'theme-ui';
import { HeadFC, Link, graphql } from 'gatsby';
import Layout from './layout';
import Listing from './listing';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import replaceSlashes from '../utils/replaceSlashes';
import Seo from './seo';

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
  return (
    <Layout>
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          Блог
        </Heading>
        <Link
          sx={(t) => ({
            ...t.styles?.a,
            variant: `links.secondary`,
            marginY: 2,
          })}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          Все теги
        </Link>
      </Flex>
      <Listing posts={allPost?.nodes} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = (props) => {
  return <Seo title="Блог" />;
};
