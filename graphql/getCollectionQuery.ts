export const getCollectionQuery = gql`
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      title
      description
      descriptionHtml
      products(first: 10) {
        nodes {
          images(first: 1) {
            nodes {
              id
              height
              altText
              url(transform: {})
              width
            }
          }
          title
        }
      }
    }
  }`
