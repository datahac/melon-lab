import { createAsyncIterator, forAwaitEach, isAsyncIterable } from 'iterall';
import { execute, subscribe, GraphQLSchema, DocumentNode } from 'graphql';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, FetchResult, Observable } from 'apollo-link';

interface SchemaLinkOptions<TRoot = any, TContext = any> {
  schema: GraphQLSchema;
  root?: TRoot;
  context?: TContext;
}

const isSubscription = (query: DocumentNode) => {
  const main = getMainDefinition(query);
  return main.kind === 'OperationDefinition' && main.operation === 'subscription';
};

const ensureIterable = (data: any) => {
  if (isAsyncIterable(data)) {
    return data;
  }

  return createAsyncIterator([data]);
};

type Executor = typeof execute | typeof subscribe;

export const createSchemaLink = (options: SchemaLinkOptions) => {
  return new ApolloLink(request => {
    return new Observable<FetchResult>(observer => {
      (async () => {
        try {
          const executor: Executor = isSubscription(request.query) ? subscribe : execute;

          const context = await (typeof options.context === 'function' ? options.context(request) : options.context);

          const result = (executor as any)(
            options.schema,
            request.query,
            options.root,
            context,
            request.variables,
            request.operationName,
          );

          const iterable = ensureIterable(await result) as AsyncIterable<any>;
          await forAwaitEach(iterable, (value: any) => observer.next(value));
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  });
};
