/* eslint-disable global-require */
import R from 'ramda';

const createCloudCode = (dependencies, Parse) => {
  // eslint-disable-next-line
  const props = { ...dependencies, Parse };
  Parse.Cloud.beforeSave(
    'Token',
    require('modules/models/Token/cloudCode/beforeSave').default(props),
  );
};

export default R.curry(createCloudCode);
