/** @jsx jsx */
import * as React from 'react';
import { jsx, Box } from 'theme-ui';
import { Link } from 'gatsby';
import ItemTags from './item-tags';
import { useTranslation } from 'react-i18next';

type BlogListItemProps = {
  post: {
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
    ns?: string;
  };
  showTags?: boolean;
};

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => {
  const ns = post.ns;
  const { t } = useTranslation(ns);
  return (
    <Box mb={4}>
      <Link
        to={post.slug}
        sx={(t) => ({ ...t.styles?.a, fontSize: [1, 2, 3], color: `text` })}
      >
        {ns ? t('title') : post?.title}
      </Link>
      <p
        sx={{
          color: `secondary`,
          mt: 1,
          a: { color: `secondary` },
          fontSize: [1, 1, 2],
        }}
      >
        <time>{post.date}</time>
        {post.tags && showTags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )}
      </p>
    </Box>
  );
};

export default BlogListItem;
