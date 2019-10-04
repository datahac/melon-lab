import { forEachField } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { getDirectiveValues } from 'graphql/execution';
import * as graphqlLanguage from 'graphql/language';

const DirectiveLocation = graphqlLanguage.DirectiveLocation;

function getFieldResolver(field) {
  const resolver = field.resolve || defaultFieldResolver;
  return resolver.bind(field);
}

function getDirectiveInfo(directive, resolverMap, schema, location, variables) {
  const name = directive.name.value;
  const Directive = schema.getDirective(name);
  if (typeof Directive === 'undefined') {
    throw new Error(`Directive @${name} is undefined. ` + 'Please define in schema before using.');
  }

  if (!Directive.locations.includes(location)) {
    throw new Error(
      `Directive @${name} is not marked to be used on "${location}" location. ` +
        `Please add "directive @${name} ON ${location}" in schema.`,
    );
  }

  const resolver = resolverMap[name];
  const args = getDirectiveValues(Directive, { directives: [directive] }, variables);
  return { args, resolver };
}

function createFieldResolver(field, resolverMap, schema) {
  const originalResolver = getFieldResolver(field);
  return (source, args, context, info) => {
    const { directives } = info.fieldNodes[0] || [];
    const resolvers = directives
      .map(directive => {
        const directiveInfo = getDirectiveInfo(
          directive,
          resolverMap,
          schema,
          DirectiveLocation.FIELD,
          info.variableValues,
        );

        return directiveInfo;
      })
      .filter(directive => typeof directive.resolver !== 'undefined');

    if (!resolvers.length) {
      return originalResolver(source, args, context, info);
    }

    const chain = resolvers.reduce((carry, current) => {
      return (parent, args, context, info) => {
        return current.resolver(carry, parent, args, context, info, current.args);
      };
    }, originalResolver);

    return chain(source, args, context, info);
  };
}

function addQueryDirectives(schema, resolverMap) {
  if (typeof resolverMap !== 'object') {
    throw new Error(`Expected resolverMap to be of type object, got ${typeof resolverMap}`);
  }

  if (Array.isArray(resolverMap)) {
    throw new Error('Expected resolverMap to be of type object, got Array');
  }

  forEachField(schema, field => {
    field.resolve = createFieldResolver(field, resolverMap, schema);
  });
}

export default addQueryDirectives;
