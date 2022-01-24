const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type User {
          _id: ID
          username: String
          email: String
          savedBooks: [Book]
     }
     type Book {
          authors: [String]
          description: String
          bookId: String
          image: String
          link: String
          title: String
     }
     type Auth {
          token: ID!
          user: User
     }
     type Query {
          users: [User]
          user(username: String!): User
     }
     type Mutation {
          createUser(username: String!, email: String!, password: String!): Auth
          login(email: String!, password: String!): Auth
          saveBook(bookId: String!, title: String!, description: String!, link: String!, image: String!, authors: [String!]): Book
          deleteBook(bookId: ID!): Book
     }
`;


module.exports = typeDefs;