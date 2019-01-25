import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLField } from 'graphql';

export class AccountDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField) {
    return {
      ...field,
      resolve: async (parent, args, context, info) => {
        const account =
          args[this.args.arg] ||
          (() => {
            const wallet = context.loaders.getWallet();
            return (wallet && wallet.address) || undefined;
          })();

        const newArgs = {
          ...args,
          [this.args.arg]: account,
        };

        return field.resolve(parent, newArgs, context, info);
      },
    };
  }
}
