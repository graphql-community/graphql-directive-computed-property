const { makeExecutableSchema } = require('graphql-tools');
const computedDirective = require('../index');

const typeDefs = `
  type User {
    firstName: String
    lastName: String
    fullName: String @computed(value: "$firstName $lastName")
  }

  type Query {
    me: User
  }
`;

const resolvers = {
  Query: {
    me: () => ({
      firstName: 'John',
      lastName: 'Doe',
    }),
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    computed: computedDirective,
  },
});
