const {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLString,
  defaultFieldResolver,
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
    const { resolve = defaultFieldResolver, name } = field;

    field.resolve = async (root, args, context, info) => {
      const result = await resolve.call(this, root, args, context, info);

      const updatedRoot = Object.assign(root, { [name]: result });

      let value = this.args.value;

      for (const property in updatedRoot) {
        if (Object.prototype.hasOwnProperty.call(updatedRoot, property)) {
          value = value.replace(
            new RegExp(`\\$${property}`, 'g'),
            updatedRoot[property]
          );
        }
      }

      return value;
    };
  }
}

module.exports = computedDirective;
