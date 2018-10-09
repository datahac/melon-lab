import { GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'SignatureHash',
  serialize: value => {
    return [
      value.r,
      value.s.substring(2),
      value.v.substring(2),
    ].join('');
  },
  parseValue: value => {
    return {
      r: value.substring(0, 66),
      s: `0x${value.substring(66, 66 + 64)}`,
      v: `0x${value.substring(66 + 64)}`,
    };
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      const signature = ast.value.toString();

      return {
        r: signature.substring(0, 66),
        s: `0x${signature.substring(66, 66 + 64)}`,
        v: `0x${signature.substring(66 + 64)}`,
      };
    }

    return null;
  },
});
