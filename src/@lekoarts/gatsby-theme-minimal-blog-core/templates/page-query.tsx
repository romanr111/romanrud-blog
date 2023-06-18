import { graphql } from 'gatsby';
import PageComponent, {
  Head,
} from '../../gatsby-theme-minimal-blog/components/page';

export default PageComponent;

export { Head };

export const query = graphql`
  query ($slug: String!, $language: String!) {
    page(slug: { eq: $slug }) {
      title
      slug
      excerpt
      ns
    }

    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
