const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema');

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || 'localhost';

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  console.log(`Server started at: http://${HOST}:${PORT}/graphiql`); // eslint-disable-line no-console
});
