/** @jsx jsx */
import { HeadFC, PageProps, graphql } from 'gatsby';
import * as React from 'react';
import { jsx, Heading } from 'theme-ui';
import Layout from './layout';
import ItemTags from './item-tags';
import Seo from './seo';
import PostFooter from './post-footer';
import { useTranslation } from 'gatsby-plugin-react-i18next';
//import { GatsbyImage, getImage } from "gatsby-plugin-image"

export type MBPostProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    tags?: {
      name: string;
      slug: string;
    }[];
    description?: string;
    canonicalUrl?: string;
    excerpt: string;
    timeToRead?: number;
    banner?: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
    image?: {
      childImageSharp: {
        gatsbyImageData: any;
      };
    };
  };
};

type PageContext = {
  frontmatter: { ns: string };
};

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post: React.FC<
  React.PropsWithChildren<PageProps<MBPostProps, PageContext>>
> = ({ data, pageContext, children }) => {
  const post = data?.post;
  const ns = pageContext?.frontmatter.ns;
  const isTranslationEnabled = !!ns;

  const { t } = useTranslation(ns);

  return (
    <Layout>
      <Heading as="h1" variant="styles.h1">
        {isTranslationEnabled ? t('title') : post.title}
      </Heading>
      <p
        sx={{
          color: `secondary`,
          mt: 3,
          a: { color: `secondary` },
          fontSize: [1, 1, 2],
        }}
      >
        <time>{post.date}</time>
        {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags ns={ns} tags={post.tags} />
          </React.Fragment>
        )}
        {post.timeToRead && ` — `}
        {post.timeToRead && (
          <span>
            {post.timeToRead} {isTranslationEnabled ? t('min_read') : ''}
          </span>
        )}
      </p>

      <section
        sx={{
          my: 5,
          'img, .gatsby-image-wrapper': {
            my: [4, 4, 5],
            borderRadius: `4px`,
            boxShadow: shadow.join(`, `),
          },
          'img, .gatsby-image-wrapper img': {
            borderRadius: `4px`,
          },
          variant: `layout.content`,
        }}
      >
        {children}
      </section>

      <PostFooter post={post} />
    </Layout>
  );
};

export default Post;

export const Head: HeadFC<MBPostProps> = ({ data: { post } }) => {
  const firstTag = post.tags && post.tags[0];
  const isBookReview = firstTag && firstTag.name === 'Обзор книги';

  const title = isBookReview
    ? `Краткое содержание - ${post.title}`
    : post.title;
  const description = isBookReview
    ? `Краткое изложение книги ${post.description} «${post.title}». Ознакомьтесь с ключевыми идеями и уроками из книги за 5 минут.`
    : post.excerpt;

  return (
    <Seo
      title={title}
      description={description}
      image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
      pathname={post.slug}
      canonicalUrl={post.canonicalUrl}
    />
  );
};
