/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { Link } from 'gatsby';
import useMinimalBlogConfig from '../hooks/use-minimal-blog-config';
import replaceSlashes from '../utils/replaceSlashes';
import { useTranslation } from 'gatsby-plugin-react-i18next';

type TagsProps = {
  tags: {
    name: string;
    slug: string;
  }[];
  ns?: string;
};

const ItemTags = ({ tags, ns }: TagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const { t } = useTranslation(ns);

  return (
    <React.Fragment>
      {tags.map((tag, i) => {
        const i18nKey = `tags.${tag.name}`;
        return (
          <React.Fragment key={tag.slug}>
            {!!i && `, `}
            <Link
              sx={(t) => ({ ...t.styles?.a })}
              to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
            >
              {ns ? t(i18nKey) : tag.name}
            </Link>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default ItemTags;
