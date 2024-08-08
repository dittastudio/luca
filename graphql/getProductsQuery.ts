export const getProductsQuery = gql`
query Products {
  products(first: 10) {
    edges {
      node {
        handle
        title
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        productType
        description
        variants(first: 10) {
          edges {
            node {
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
  # collections(first: 10) {
  #   nodes {
  #     title
  #   }
  # }
}`
