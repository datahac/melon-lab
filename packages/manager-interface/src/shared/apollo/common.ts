import { onError } from 'apollo-link-error';

export const createErrorLink = () => onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('[GQL ERROR]: Message: %s, Path: %s, Locations: %o', message, path && path.join('.'), locations);
    });
  }

  if (networkError) {
    console.log('[GQL NETWORK ERROR]: %s', networkError);
  }
});
