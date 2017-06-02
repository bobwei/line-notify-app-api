/* eslint-disable global-require */
import R from 'ramda';

const createCloudCode = (dependencies, Parse) => {
  // eslint-disable-next-line
  const props = { ...dependencies, Parse };
};

export default R.curry(createCloudCode);
