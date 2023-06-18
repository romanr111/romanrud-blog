import { graphql } from 'gatsby';
import TagsComponent, {
  Head,
} from '../../gatsby-theme-minimal-blog/components/tags';

export default TagsComponent;

export { Head };

export const query = graphql`
  query ($language: String!) {
    list: allPost {
      group(field: { tags: { name: SELECT } }) {
        fieldValue
        totalCount
        nodes {
          ns
        }
      }
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
