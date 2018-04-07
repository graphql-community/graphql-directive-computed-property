const { makeExecutableSchema } = require('graphql-tools');
const computedDirective = require('../index');
const restDirective = require('graphql-directive-rest');

const ADMIN_URL = 'https://yesno.wtf/api';

const typeDefs = `
  type User {
    firstName: String
    lastName: String
    admin: String @rest(url: "${ADMIN_URL}" extractFromResponse: "answer") @computed(value: "Are you admin? $admin")
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
    rest: restDirective,
  },
});
