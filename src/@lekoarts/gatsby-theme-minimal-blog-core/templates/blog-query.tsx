import { graphql } from 'gatsby';
import BlogComponent from '../../gatsby-theme-minimal-blog/components/blog';

export default BlogComponent;

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
        ns
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
