import * as R from 'ramda';
import Accounts from 'web3-eth-accounts';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLField } from 'graphql';

export class SignDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField) {
    return {
      ...field,
      resolve: async (parent, args, context, info) => {
        if (typeof args[this.args.target] !== 'undefined') {
          // The transaction is already signed.
          return field.resolve(parent, args, context, info);
        }

        const { environment, loaders } = context;
        const wallet = loaders.getWallet();
        const accounts = new Accounts(environment.eth.currentProvider);
        const unsigned = args[this.args.source];
        const signed = await accounts.signTransaction(
          R.pick(['data', 'from', 'gas', 'gasPrice', 'to', 'value'], unsigned),
          wallet && wallet.privateKey,
        );

        const newArgs = {
          ...args,
          [this.args.target]: signed,
          signedOrder: unsigned.signedOrder,
        };

        return field.resolve(parent, newArgs, context, info);
      },
    };
  }
}
