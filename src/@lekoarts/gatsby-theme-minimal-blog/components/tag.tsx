/** @jsx jsx */
import { jsx, Heading, Flex } from 'theme-ui';
import { Link } from 'gatsby';
import Layout from './layout';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import Listing from './listing';
import replaceSlashes from '../utils/replaceSlashes';
import { useTranslation } from 'react-i18next';

export type MBTagProps = {
  data: {
    allPost: {
      nodes: {
        slug: string;
        title: string;
        date: string;
        excerpt: string;
        description: string;
        timeToRead?: number;
        tags: {
          name: string;
          slug: string;
        }[];
        ns?: string;
      }[];
    };
  };
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
    slug: string;
    name: string;
  };
};

const Tag = ({ data, pageContext }: MBTagProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const posts = data?.allPost?.nodes;
  const { t } = useTranslation('tags');

  return (
    <Layout title={`Tag: ${pageContext.name}`}>
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          {t(pageContext.name)}
        </Heading>
        <Link
          sx={(t) => ({
            ...t.styles?.a,
            variant: `links.secondary`,
            marginY: 2,
          })}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          {t('view_all_tags')}
        </Link>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Tag;
