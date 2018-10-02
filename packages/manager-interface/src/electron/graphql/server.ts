import * as MessageTypes from './constants';
import {
  parse,
  execute,
  subscribe,
  ExecutionResult,
  GraphQLSchema,
  DocumentNode,
  validate,
  ValidationContext,
  specifiedRules,
  getOperationAST,
} from 'graphql';

import {
  $$asyncIterator,
  createAsyncIterator,
  forAwaitEach,
  isAsyncIterable,
} from 'iterall';

export const createEmptyIterable = (): AsyncIterator<any> => {
  return {
    next() {
      return Promise.resolve({ value: undefined, done: true });
    },
    return() {
      return Promise.resolve({ value: undefined, done: true });
    },
    throw(e: Error) {
      return Promise.reject(e);
    },
    [$$asyncIterator]() {
      return this;
    },
  };
};

export const isASubscriptionOperation = (
  document: DocumentNode,
  operationName: string,
): boolean => {
  const operationAST = getOperationAST(document, operationName);
  return !!operationAST && operationAST.operation === 'subscription';
};

export type ExecutionIterator = AsyncIterator<ExecutionResult>;

export interface OperationMessagePayload {
  query?: string;
  variables?: { [key: string]: any };
  operationName?: string;
}

export interface OperationMessage {
  payload?: OperationMessagePayload;
  id?: string;
  type: string;
}

export interface ServerOptions {
  root?: any;
  context?: any;
  schema?: GraphQLSchema;
}

export interface TransportOptions {
  channel: string;
  messenger: any;
}

export class SubscriptionServer {
  private channel: string;
  private messenger: any;
  private context: any;
  private operations: {};
  private schema: GraphQLSchema;
  private root: any;
  private rules: Array<(context: ValidationContext) => any>;

  constructor(
    transportOptions: TransportOptions,
    serverOptions: ServerOptions,
  ) {
    const { schema, context, root } = serverOptions;
    const { channel, messenger } = transportOptions;

    this.operations = {};
    this.messenger = messenger;
    this.channel = channel;
    this.schema = schema;
    this.context = context;
    this.root = root;

    // Use the default validation rules.
    this.rules = specifiedRules;
    this.messenger.on(`${this.channel}-req`, this.onMessage.bind(this));
  }

  private unsubscribe(id: string) {
    if (this.operations && this.operations[id]) {
      if (this.operations[id].return) {
        this.operations[id].return();
      }

      delete this.operations[id];
    }
  }

  private onMessage(event, id, type, payload) {
    const messenger = event.sender;

    switch (type) {
      case MessageTypes.GQL_START:
        if (this.operations && this.operations[id]) {
          this.unsubscribe(id);
        }

        this.operations[id] = createEmptyIterable();

        const executionPromise = this.executeOperation(
          payload.query,
          payload.variables,
          payload.operationName,
        );

        return executionPromise
          .then(result => {
            if (isAsyncIterable(result)) {
              return result;
            }

            return createAsyncIterator([result]);
          })
          .then(iterable => {
            forAwaitEach(iterable as any, (value: ExecutionResult) => {
              this.sendMessage(messenger, id, MessageTypes.GQL_DATA, value);
            })
              .then(() => {
                this.sendMessage(messenger, id, MessageTypes.GQL_COMPLETE, null);
              })
              .catch((error: Error) => {
                this.sendMessage(messenger, id, MessageTypes.GQL_ERROR, error);
              });

            return iterable;
          })
          .then((subscription: ExecutionIterator) => {
            return (this.operations[id] = subscription);
          })
          .catch((e: any) => {
            if (e.errors) {
              this.sendMessage(messenger, id, MessageTypes.GQL_DATA, {
                errors: e.errors,
              });
            } else {
              this.sendMessage(messenger, id, MessageTypes.GQL_ERROR, {
                message: e.message,
              });
            }

            this.unsubscribe(id);
          });

      case MessageTypes.GQL_STOP:
        this.unsubscribe(id);
        break;

      default:
        this.sendMessage.call(this, messenger, id, MessageTypes.GQL_ERROR, {
          message: 'Invalid message type.',
        });
    }
  }

  private sendMessage(messenger, id: string, type: string, payload: any): void {
    messenger.send(`${this.channel}-res`, id, type, payload);
  }

  private executeOperation(
    query,
    variables,
    operation,
  ): Promise<AsyncIterator<ExecutionResult> | ExecutionResult> {
    const document = typeof query !== 'string' ? query : parse(query);
    const errors = validate(this.schema, document, this.rules);

    if (errors.length > 0) {
      return Promise.resolve({ errors });
    }

    const context = typeof this.context === 'function' ? this.context() : this.context;

    if (isASubscriptionOperation(document, operation)) {
      return Promise.resolve(
        subscribe(
          this.schema,
          document,
          this.root,
          context,
          variables,
          operation,
        ),
      );
    }

    return Promise.resolve(
      execute(
        this.schema,
        document,
        this.root,
        context,
        variables,
        operation,
      ),
    );
  }
}