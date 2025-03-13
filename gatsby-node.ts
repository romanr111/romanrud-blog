import { CreateResolversArgs, GatsbyNode } from 'gatsby';
import path from 'path';

interface Frontmatter {
  ns?: string;
  slug?: {
    en: string;
    uk: string;
    ru: string;
  };
}

interface MdxNode {
  id: string;
  internal: {
    type: string;
    contentFilePath: string;
  };
  frontmatter?: Frontmatter;
  parent?: string;
}

interface QueryResult {
  allMdx: {
    nodes: Array<MdxNode>;
  };
}

interface Tag {
  name: string
  slug: string
}

interface Post {
  id: string
  slug: string
  title: string
  date: Date
  tags: Tag[]
  description?: string
  canonicalUrl?: string
  excerpt: string
  timeToRead: number
  banner?: {
    childImageSharp: {
      resize: {
        src: string
      }
    }
  }
  ns?: string
}

interface MdxPost extends Post {
  localizedSlug: {
    en: string
    uk: string
    ru: string
  }
}

interface Resolvers {
  MdxPage: {
    ns: {
      resolve: (source: MdxNode) => string | null;
    };
  };
  MdxPost: {
    ns: {
      resolve: (source: MdxNode) => string | null;
    };
    localizedSlug: {
      resolve: (source: MdxNode) => Frontmatter['slug'] | null;
    };
  };
}

interface GatsbyGraphQLResult<T> {
  errors?: any;
  data?: T;
}

interface AllMdxResult {
  allMdx: {
    nodes: Array<{
      id: string;
      internal: {
        contentFilePath: string;
      };
      frontmatter?: {
        slug?: {
          en: string;
          uk: string;
          ru: string;
        };
      };
    }>;
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<AllMdxResult>(`
    {
      allMdx {
        nodes {
          id
          internal {
            contentFilePath
          }
          frontmatter {
            slug {
              en
              uk
              ru
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
    return;
  }

  if (!result.data?.allMdx?.nodes) {
    reporter.warn('No MDX nodes found');
    return;
  }

  // Create blog posts pages
  const posts = result.data.allMdx.nodes;
  const postTemplate = path.resolve('./src/@lekoarts/gatsby-theme-minimal-blog-core/templates/post-query.tsx');

  // Create pages for each language version
  const languages = ['en', 'uk', 'ru'] as const;
  
  posts.forEach((node) => {
    if (!node?.frontmatter?.slug) {
      reporter.warn(`Post node ${node.id} has no localized slugs in frontmatter`);
      return;
    }

    const slugs = node.frontmatter.slug;

    languages.forEach((lang) => {
      const localizedSlug = slugs[lang];
      if (!localizedSlug) {
        reporter.warn(`Post node ${node.id} has no slug for language ${lang}`);
        return;
      }

      // Always include language prefix in path, even for English
      const path = `/${lang}${localizedSlug}`;
      
      createPage({
        path,
        component: postTemplate,
        context: {
          id: node.id,
          slug: localizedSlug,
          language: lang,
          formatString: 'MMMM DD, YYYY',
        },
      });

      // For English, create an additional page without language prefix for backward compatibility
      if (lang === 'en') {
        createPage({
          path: localizedSlug,
          component: postTemplate,
          context: {
            id: node.id,
            slug: localizedSlug,
            language: lang,
            formatString: 'MMMM DD, YYYY',
          },
        });
      }
    });
  });
};

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({
  page,
  actions,
}) => {
  const { createPage, deletePage } = actions;
  // Check if the page is a localized 404
  if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
    const oldPage = { ...page };
    // Get the language code from the path, and match all paths
    // starting with this code (apart from other valid paths)
    const langCode = page.path.split(`/`)[1];
    page.matchPath = `/${langCode}/*`;
    // Recreate the modified page
    deletePage(oldPage);
    createPage(page);
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type LocalizedSlug {
      en: String
      uk: String
      ru: String
    }

    type PostTag {
      name: String!
      slug: String!
    }

    type MdxFrontmatter {
      title: String!
      date: Date! @dateformat
      slug: LocalizedSlug
      description: String
      tags: [String!]!
      banner: String
      ns: String
    }

    interface Post implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      tags: [PostTag!]!
      description: String
      canonicalUrl: String
      excerpt: String!
      timeToRead: Float!
      banner: File @fileByRelativePath
      ns: String
    }

    type MdxPost implements Node & Post {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      tags: [PostTag!]!
      description: String
      canonicalUrl: String
      excerpt: String!
      timeToRead: Float!
      banner: File @fileByRelativePath
      localizedSlug: LocalizedSlug
      ns: String
    }

    type Page implements Node {
      ns: String
    }

    type MdxPage implements Node {
      ns: String
    }
  `;
    createTypes(typeDefs);
  };

export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers,
  getNode,
}: CreateResolversArgs) => {
  const resolvers: Resolvers = {
    MdxPage: {
      ns: {
        resolve: (source) => {
          if (source.parent) {
            const parent = getNode(source.parent);
            if (parent && parent.internal.type === 'Mdx') {
              const mdxParent = parent as MdxNode;
              return mdxParent.frontmatter?.ns || null;
            }
          }
          return null;
        },
      },
    },
    MdxPost: {
      ns: {
        resolve: (source) => {
          if (source.parent) {
            const parent = getNode(source.parent);
            if (parent && parent.internal.type === 'Mdx') {
              const mdxParent = parent as MdxNode;
              return mdxParent.frontmatter?.ns || null;
            }
          }
          return null;
        },
      },
      localizedSlug: {
        resolve: (source) => {
          if (source.parent) {
            const parent = getNode(source.parent);
            if (parent && parent.internal.type === 'Mdx') {
              const mdxParent = parent as MdxNode;
              return mdxParent.frontmatter?.slug || null;
            }
          }
          return null;
        },
      },
    },
  };

  createResolvers(resolvers);
};
