import definitions from 'parse-server/lib/cli/definitions/parse-server';

export default env =>
  Object.keys(definitions).reduce((config, key) => {
    const value = env[definitions[key].env] || definitions[key].default;
    if (value !== undefined) {
      return {
        ...config,
        [key]: value,
      };
    }
    return config;
  }, {});
