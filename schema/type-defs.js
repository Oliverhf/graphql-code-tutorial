const {gql} = require('apollo-server') // gql function parses your query into a query document

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    type Query {
        users: [User!]!
    }

`

module.exports = { typeDefs }
