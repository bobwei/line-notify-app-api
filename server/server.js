import express from 'express';
import Parse from 'parse/node';
import ParseServer from 'parse-server';
import ParseDashboard from 'parse-dashboard';

import createCloudCode from 'modules/cloudCode';

import parseEnvToConfig from './utils/parseEnvToConfig';

const createServer = (env = process.env) => {
  const {
    PARSE_DASHBOARD_ALLOW_INSECURE_HTTP = 'false',
    PARSE_DASHBOARD_USERNAME,
    PARSE_DASHBOARD_PASSWORD,
    PARSE_DASHBOARD_MOUNT_PATH,
    PARSE_DASHBOARD_APP_NAME,
    NODE_ENV,
    PORT,
    PARSE_SERVER_MOUNT_PATH,
    PARSE_SERVER_URL_FOR_SDK = `http://localhost:${PORT}${PARSE_SERVER_MOUNT_PATH}`,
  } = env;

  const app = express();

  /* parse-server */
  const parseServerConfig = parseEnvToConfig(process.env);
  const parseServerAPI = new ParseServer({
    ...parseServerConfig,
    cloud: createCloudCode({}),
  });
  app.use(parseServerConfig.mountPath, parseServerAPI.app);

  /* parse-dashboard */
  const parseDashboardConfig = {
    ...parseServerConfig,
    mountPath: PARSE_DASHBOARD_MOUNT_PATH || '/parse-dashboard',
    appName: PARSE_DASHBOARD_APP_NAME || parseServerConfig.appId,
    production: NODE_ENV === 'production',
  };
  const parseDashboard = new ParseDashboard(
    {
      apps: [parseDashboardConfig],
      users: [
        {
          user: PARSE_DASHBOARD_USERNAME,
          pass: PARSE_DASHBOARD_PASSWORD,
        },
      ],
    },
    PARSE_DASHBOARD_ALLOW_INSECURE_HTTP === 'true',
  );
  app.use(parseDashboardConfig.mountPath, parseDashboard);

  /*
    Setup parse sdk for js after parse-server initialization
    since parse-server initialize parse sdk for js too which will override settings.
    Following settings are initialized inside parse-server
    PARSE_SERVER_APPLICATION_ID
    PARSE_SERVER_JAVASCRIPT_KEY
    PARSE_SERVER_MASTER_KEY
  */
  Parse.serverURL = PARSE_SERVER_URL_FOR_SDK;

  return new Promise(resolve => {
    const server = app.listen(parseServerConfig.port, () => {
      console.log(`Server running on port ${server.address().port}.`);
      resolve({ server, parseServerAPI });
    });
  });
};

export default createServer;
