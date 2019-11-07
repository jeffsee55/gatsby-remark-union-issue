```
yarn install
yarn start
```

Visit http://localhost:8000/___graphql and run the following
query 

```gql
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          blocks {
          	...on BlockHero {
              heroField1
            }
            ...on BlockColumns {
              columnField1
            }
          }
        }
      }
    }
  }
}
```

The above query should work, but you'll notice the below query won't work since `heroField2` and 
`columnField2` aren't explicitly defined in the 
`createSchemaCustomization` function found in `gatsby-node.js`:
```gql
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          blocks {
          	...on BlockHero {
              heroField1
              heroField2
            }
            ...on BlockColumns {
              columnField1
              columnField2
            }
          }
        }
      }
    }
  }
}
```