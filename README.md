# graphql-directive-computed-property

[![Version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![PRs Welcome][prs-badge]][prs]
[![MIT License][license-badge]][build]

# Introduction

The directive allows creating a computed property from fields where is defined.

# Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#Usage)
* [Parameters](#parameters)
* [Contributing](#contributing)
* [LICENSE](#license)

# Installation

```
yarn add graphql-directive-computed-property
```

_This package requires [graphql](https://www.npmjs.com/package/graphql) and [graphql-tools](https://www.npmjs.com/package/graphql-tools) as peer dependency_

# Usage

```js
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
```

Query: 

```graphql
query {
  me {
    fullName
  }
}
```

Result: 

```js
{
  fullName: 'John Doe'
}
```

# Directive Parameters

Directive params:

### `value`: String

The calculated value. It can contain other fields from the type in which it is defined.

Example: 

`@computed(value: "$firstName $lastName")` 

`@computed(value: "$price $")` 

## Contributing

I would love to see your contribution. ❤️

For local development (and testing), all you have to do is to run `yarn` and then `yarn dev`. This will start the Apollo server and you are ready to contribute :tada:

Run yarn test (try `--watch` flag) for unit tests (we are using Jest)

# LICENSE

The MIT License (MIT) 2018 - Luke Czyszczonik - <mailto:lukasz.czyszczonik@gmail.com>

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/graphql-community/graphql-directive-computed-property.svg?style=flat-square
[build]: https://travis-ci.org/graphql-community/graphql-directive-computed-property
[coverage-badge]: https://img.shields.io/codecov/c/github/graphql-community/graphql-directive-computed-property.svg?style=flat-square
[coverage]: https://codecov.io/github/graphql-community/graphql-directive-computed-property
[version-badge]: https://img.shields.io/npm/v/graphql-directive-computed-property.svg?style=flat-square
[package]: https://www.npmjs.com/package/graphql-directive-computed-property
[downloads-badge]: https://img.shields.io/npm/dm/graphql-directive-computed-property.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/graphql-directive-computed-property
[license-badge]: https://img.shields.io/npm/l/graphql-directive-computed-property.svg?style=flat-square
[license]: https://github.com/graphql-community/graphql-directive-computed-property/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/graphql-community/graphql-directive-computed-property/blob/master/CODE_OF_CONDUCT.md
