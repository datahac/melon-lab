import { GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'SignedMessage',
  serialize: value => value.toString(),
  parseValue: value => value,
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return ast.value.toString();
    }

    return null;
  },
});
