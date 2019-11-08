/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = require('./gatsby/createPages')
exports.onCreateNode = require('./gatsby/onCreateNode')

exports.createSchemaCustomization = ({ actions: { createTypes }, schema }) => {
  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "BlockHero",
      fields: {
        template: 'String!',
        heroField1: 'String'
      },
      interfaces: ["Node"],
      extensions: { infer: true }
    }),
    schema.buildObjectType({
      name: "BlockColumns",
      fields: {
        template: 'String!',
        columnField1: 'String!',
      },
      interfaces: ["Node"],
      extensions: { infer: true }
    }),
    schema.buildUnionType({
      name: "HeroColumnUnion",
      types: ['BlockHero', 'BlockColumns' ],
      resolveType(value) {
        if (value.template === 'block__hero') {
          return 'BlockHero';
        }
        if (value.template === 'block__columns') {
          return 'BlockColumns';
        }

        throw 'No template defined'
      }
    }),
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        blocks: {
          type: ['HeroColumnUnion'],
        }
      },
      extensions: { infer: true }
    }),
  ]
  createTypes(typeDefs)
};


