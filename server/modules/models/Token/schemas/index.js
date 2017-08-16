export default {
  className: 'Token',
  fields: {
    access_token: {
      type: 'String',
    },
  },
  classLevelPermissions: {
    find: {},
    get: {},
    create: {
      '*': true,
    },
    update: {},
    delete: {},
    addField: {},
  },
};
