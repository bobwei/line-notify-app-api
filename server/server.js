import express from 'express';
import ParseServer from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import dotenv from 'dotenv';

import parseEnvToConfig from './utils/parseEnvToConfig';

dotenv.config();
const {
  PARSE_DASHBOARD_ALLOW_INSECURE_HTTP = 'false',
  PARSE_DASHBOARD_USERNAME,
  PARSE_DASHBOARD_PASSWORD,
  PARSE_DASHBOARD_MOUNT_PATH,
  PARSE_DASHBOARD_APP_NAME,
  NODE_ENV,
} = process.env;

export const app = express();

/* parse-server */
export const parseServerConfig = parseEnvToConfig(process.env);
export const parseServerAPI = new ParseServer(parseServerConfig);
app.use(parseServerConfig.mountPath, parseServerAPI.app);

/* parse-dashboard */
export const parseDashboardConfig = {
  ...parseServerConfig,
  mountPath: PARSE_DASHBOARD_MOUNT_PATH || '/parse-dashboard',
  appName: PARSE_DASHBOARD_APP_NAME || parseServerConfig.appId,
  production: NODE_ENV === 'production',
};
export const parseDashboard = new ParseDashboard({
  apps: [parseDashboardConfig],
  users: [{
    user: PARSE_DASHBOARD_USERNAME,
    pass: PARSE_DASHBOARD_PASSWORD,
  }],
}, PARSE_DASHBOARD_ALLOW_INSECURE_HTTP === 'true');
app.use(parseDashboardConfig.mountPath, parseDashboard);

export const server = app.listen(parseServerConfig.port, () => {
  console.log(`Server running on port ${parseServerConfig.port}.`);
});
