import { CreateResolversArgs, GatsbyNode, Node } from 'gatsby';

interface Frontmatter {
  ns?: string;
  slug?: {
    en: string;
    uk: string;
    ru: string;
  };
}

interface MdxNode {
  internal: {
    type: string;
  };
  frontmatter?: Frontmatter;
  parent?: string;
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

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMdx: {
      nodes: Array<{
        id: string;
        frontmatter?: {
          slug?: {
            en: string;
            uk: string;
            ru: string;
          };
        };
      }>;
    };
  }>(`
    {
      allMdx(filter: {frontmatter: {slug: {ne: null}}}) {
        nodes {
          id
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
  }

  // Create blog posts pages
  const posts = result.data?.allMdx.nodes || [];

  // Create pages for each language version
  const languages = ['en', 'uk', 'ru'];
  
  posts.forEach((node) => {
    const slugs = node.frontmatter?.slug;
    if (!slugs) return;

    languages.forEach((lang) => {
      const localizedSlug = slugs[lang as keyof typeof slugs];
      if (!localizedSlug) return;

      const path = lang === 'en' ? localizedSlug : `/${lang}${localizedSlug}`;
      
      createPage({
        path,
        component: require.resolve('./src/@lekoarts/gatsby-theme-minimal-blog-core/templates/post-query.tsx'),
        context: {
          id: node.id,
          slug: localizedSlug,
          language: lang,
        },
      });
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

    extend type Post {
      ns: String
      localizedSlug: LocalizedSlug
    }

    extend type MdxPost {
      ns: String
      localizedSlug: LocalizedSlug
    }

    extend type Page {
      ns: String
    }

    extend type MdxPage {
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
