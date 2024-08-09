export const getProductQuery = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      title
      handle
    }
  }`
