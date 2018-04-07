const { graphql } = require('graphql');
const directive = require('../index');
const schema = require('../example/schema');

test('getDirectiveDeclaration should be defined', () => {
  expect(directive.getDirectiveDeclaration()).toMatchSnapshot();
});

test('if return computed property', () =>
  graphql(
    schema,
    `
      query {
        me {
          firstName
          lastName
          fullName
        }
      }
    `
  ).then(response => {
    expect(response).toMatchSnapshot();
  }));
