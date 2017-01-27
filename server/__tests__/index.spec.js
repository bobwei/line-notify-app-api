import ParseServer from 'parse-server/lib/ParseServer';
import 'dotenv/config';

import parseEnvToConfig from '../utils/parseEnvToConfig';
import { server } from '../server';

jest.useFakeTimers();

afterAll(() => {
  server.close();
});

it('can create a parse-server instance', () => {
  const promises = [];
  const parseServerConfig = {
    ...parseEnvToConfig(process.env),
    __indexBuildCompletionCallbackForTests(dbInitPromise) {
      promises.push(dbInitPromise);
    },
  };
  // eslint-disable-next-line no-unused-vars
  const parseServer = new ParseServer(parseServerConfig);
  return Promise.all(promises);
});
