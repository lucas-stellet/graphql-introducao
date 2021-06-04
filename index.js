const { ApolloServer, gql } = require("apollo-server");

// all requests are POST

// all requests are on the same endpoint (/graphql)

// Query -> Get information (GET)
// Mutation -> Manipulate data (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const randomHash =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    _id: String(randomHash),
    name: "Lucas",
    email: "lucas@gmail.com",
    active: true,
  },
  {
    _id: String(randomHash),
    name: "Noah",
    email: "noah@gmail.com",
    active: false,
  },
  {
    _id: String(randomHash),
    name: "Tatiane",
    email: "tatiane@gmail.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello World",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(randomHash),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);

      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server is listening on ${url}`));
