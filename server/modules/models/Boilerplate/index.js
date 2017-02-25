export default {
  className: 'Boilerplate',
  fields: {
    string: {
      type: 'String',
    },
    boolean: {
      type: 'Boolean',
    },
    date: {
      type: 'Date',
    },
    number: {
      type: 'Number',
    },
  },
  classLevelPermissions: {
    find: {
      '*': true,
    },
    get: {
      '*': true,
    },
    create: {
      '*': true,
    },
    update: {
      '*': true,
    },
    delete: {
      '*': true,
    },
    addField: {
      '*': true,
    },
  },
};
