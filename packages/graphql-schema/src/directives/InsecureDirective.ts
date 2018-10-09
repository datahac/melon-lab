import { SchemaDirectiveVisitor } from 'graphql-tools';

const isElectron = JSON.parse(process.env.ELECTRON || 'false');

class InsecureDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    if (process.env.NODE_ENV === 'production' && !isElectron) {
      field.resolve = (_, __, ___, info) => {
        throw new Error(
          `The field "${info.fieldName}" on "${
          info.parentType
          }" cannot be accessed through the public api.`,
        );
      };
    }
  }
}

export default InsecureDirective;
