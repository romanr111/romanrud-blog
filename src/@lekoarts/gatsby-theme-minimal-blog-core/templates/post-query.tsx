import { graphql } from 'gatsby';
import PostComponent, {
  Head,
} from '../../gatsby-theme-minimal-blog/components/post';

export default PostComponent;

export { Head };

export const query = graphql`
  query ($slug: String!, $formatString: String!, $language: String!) {
    post(slug: { eq: $slug }) {
      slug
      title
      date(formatString: $formatString)
      tags {
        name
        slug
      }
      description
      canonicalUrl
      excerpt
      timeToRead
      banner {
        childImageSharp {
          resize(width: 1200, quality: 90) {
            src
          }
        }
      }
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
