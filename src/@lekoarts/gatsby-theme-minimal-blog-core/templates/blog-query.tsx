import { graphql } from "gatsby";
import BlogComponent, {
  Head,
} from "../../gatsby-theme-minimal-blog/components/blog";

export default BlogComponent;

export { Head };

export const query = graphql`
  query ($formatString: String!, $language: String!) {
    allPost(sort: { date: DESC }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
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
