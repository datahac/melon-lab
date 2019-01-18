import { ApolloLink, Observable } from 'apollo-link';
import { ExecutionResult, GraphQLError, print } from 'graphql';
import { SerializableGraphQLRequest } from './types';

export interface ApolloRpcLinkOptions {
  channel?: string;
  ipc: any;
}

export const createIpcLink = (options: ApolloRpcLinkOptions) => {
  const channel = (options && options.channel) || 'graphql';
  let counter = 0;

  return new ApolloLink(operation => {
    return new Observable(
      (observer: ZenObservable.SubscriptionObserver<ExecutionResult>) => {
        const request: SerializableGraphQLRequest = {
          operationName: operation.operationName,
          variables: operation.variables,
          query: print(operation.query),
          context: operation.getContext(),
        };

        const current = `${++counter}`;
        const listener = (event, id, type, data) => {
          if (id !== current) {
            return;
          }

          switch (type) {
            case 'data':
              return observer.next(data);

            case 'error': {
              options.ipc.removeListener(channel, listener);
              return observer.error(data);
            }

            case 'complete': {
              options.ipc.removeListener(channel, listener);
              return observer.complete();
            }
          }
        };

        options.ipc.on(channel, listener);
        options.ipc.send(channel, current, request);
      },
    );
  });
};
