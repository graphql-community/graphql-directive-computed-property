const { graphql } = require('graphql');
const nock = require('nock');
const directive = require('../index');
const schema = require('../example/schema');

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

test('getDirectiveDeclaration should be defined', () => {
  expect(directive.getDirectiveDeclaration()).toMatchSnapshot();
});

test('if return computed property', async () => {
  const response = await graphql(
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
  );

  expect(response).toMatchSnapshot();
});

test('check if not replace original resolver', async () => {
  nock('https://yesno.wtf:443', { encodedQueryParams: true })
    .get('/api')
    .reply(200, { answer: 'yes' });

  const response = await graphql(
    schema,
    `
      query {
        me {
          firstName
          lastName
          admin
        }
      }
    `
  );

  expect(response).toMatchSnapshot();
});
