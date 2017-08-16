import express from 'express';

import authorized from './authorized';

const createAPI = props => {
  const app = express();

  app.get('/authorized', authorized(props));

  return app;
};

export default createAPI;
