import * as Rx from 'rxjs';
import { FetchResult, execute, Observable, ApolloLink } from 'apollo-link';
import { parse } from 'graphql';
import { SerializableGraphQLRequest } from './types';

export interface IpcExecutorOptions {
  link: ApolloLink;
  ipc: any;
  channel?: string;
}

export const createIpcExecutor = (options: IpcExecutorOptions) => {
  const channel = options.channel || 'graphql';

  options.ipc.on(channel, (event, id, request: SerializableGraphQLRequest) => {
    const result$ = new Rx.Observable<FetchResult>(observer => {
      const result: Observable<FetchResult> = execute(options.link, {
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
