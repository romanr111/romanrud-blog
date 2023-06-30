import { CreateResolversArgs, GatsbyNode, Node } from 'gatsby';

interface Frontmatter {
  ns: string | null;
}

interface MdxNode extends Node {
  parent: string;
  frontmatter: Frontmatter;
}

interface Resolvers {
  [key: string]: {
    ns: {
      resolve: (source: MdxNode) => string | null;
    };
  };
}

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
    extend type Post {
      ns: String
    }

    extend type MdxPost {
      ns: String
    }

     extend type Page  {
      ns: String
    }

    extend type  MdxPage {
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
    },
  };

  createResolvers(resolvers);
};
