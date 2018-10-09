import { GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'UnsignedMessage',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value.toString());
    }

    return null;
  },
});
