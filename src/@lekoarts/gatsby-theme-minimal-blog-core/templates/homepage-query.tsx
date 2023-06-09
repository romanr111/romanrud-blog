import { graphql } from "gatsby"
import HomepageComponent, { Head } from "../../gatsby-theme-minimal-blog/components/homepage"

export default HomepageComponent

export { Head }

export const query = graphql`
  query ($formatString: String!, $language: String!) {
    allPost(sort: { date: DESC }, limit: 3) {
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