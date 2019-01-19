import * as Rx from 'rxjs';
import { createAsyncIterator, forAwaitEach, isAsyncIterable } from 'iterall';
import {
  ApolloLink,
  FetchResult,
  Observable,
  execute as executeLink,
} from 'apollo-link';
import {
  parse,
  execute,
  subscribe,
  GraphQLSchema,
  ExecutionResult,
} from 'graphql';
import { getMainDefinition } from 'apollo-utilities';
import { SerializableGraphQLRequest } from './types';

export interface IpcExecutorOptions {
  link: ApolloLink;
  ipc: any;
  channel?: string;
}

const isSubscription = query => {
  const main = getMainDefinition(query);
  return (
    main.kind === 'OperationDefinition' && main.operation === 'subscription'
  );
};

export interface SchemaLinkOptions {
  schema: GraphQLSchema;
  context?: any;
}

type Executor = typeof execute | typeof subscribe;

export const createSchemaLink = (options: SchemaLinkOptions) =>
  new ApolloLink(request => {
    return new Observable<FetchResult>(observer => {
      const executor: Executor = isSubscription(request.query)
        ? subscribe
        : execute;
      const context =
        typeof options.context === 'function'
          ? options.context(request)
          : options.context;

      const result = (executor as any)(
        options.schema,
        request.query,
        null,
        context,
        request.variables,
        request.operationName,
      );

      Promise.resolve(result)
        .then(data => {
          const iterable = isAsyncIterable(data)
            ? data
            : createAsyncIterator([data]);

          forAwaitEach(iterable as any, (value: ExecutionResult) => {
            observer.next(value);
          })
            .then(() => {
              observer.complete();
            })
            .catch(error => {
              observer.error(error);
            });
        })
        .catch(error => observer.error(error));
    });
  });

export const createIpcExecutor = (options: IpcExecutorOptions) => {
  const channel = options.channel || 'graphql';

  options.ipc.on(channel, (event, id, request: SerializableGraphQLRequest) => {
    const result$ = new Rx.Observable<FetchResult>(observer => {
      const result: Observable<FetchResult> = executeLink(options.link, {
        ...request,
        query: parse(request.query),
      });

      return result.subscribe(
        data => observer.next(data),
        error => observer.error(error),
        () => observer.complete(),
      );
    });

    return result$.subscribe(
      data => event.sender.send(channel, id, 'data', data),
      error => event.sender.send(channel, id, 'error', error),
      () => event.sender.send(channel, id, 'complete'),
    );
  });
};
