import { GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'UnsignedTransaction',
  serialize: value => JSON.stringify(value),
  parseValue: value => JSON.parse(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value.toString());
    }

    return null;
  },
});
