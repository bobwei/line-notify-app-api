import R from 'ramda';
import 'dotenv/config';

import ParseServerAPI from 'modules/apiClients/ParseServerAPI';
import defaultSchema from 'modules/models/Boilerplate/default';
import models from 'modules/models';

const validate = () =>
  Promise
    .resolve()
    .then(() => ParseServerAPI.request().get('/schemas'))
    .then(R.path(['data', 'results']))
    .then((schemas) => {
      const promises = models.map((model) => {
        const { className } = model;
        const schema = R.find(R.propEq('className', className))(schemas);
        return Promise
          .resolve()
          .then(() => {
            if (!schema) {
              return ParseServerAPI.request().post('/schemas', defaultSchema(className));
            }
            return Promise.resolve();
          })
          .then(() => ParseServerAPI.request().put(`/schemas/${className}`, {
            ...model,
            fields: R.omit(R.keys(schema.fields))(model.fields),
          }))
          .then(() => console.log(`Schema ${className} validate success`));
      });
      return Promise.all(promises);
    })
    .then(() => console.log(`validation over ${models.length} models complete successfully`))
    .catch(console.log);

if (require.main === module) {
  validate();
}

export default validate;
