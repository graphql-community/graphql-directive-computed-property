const {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLString,
} = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');

class computedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = 'rest') {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        value: { type: GraphQLString },
      },
    });
  }

  visitFieldDefinition(field) {
    field.resolve = root => {
      let computed = this.args.value;

      for (const property in root) {
        if (Object.prototype.hasOwnProperty.call(root, property)) {
          computed = computed.replace(`$${property}`, root[property]);
        }
      }

      return computed;
    };
  }
}

module.exports = computedDirective;
