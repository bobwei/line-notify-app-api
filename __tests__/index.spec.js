/* eslint-disable global-require, arrow-body-style */
import path from 'path';
import axios from 'axios';

jest.useFakeTimers();

beforeAll(() => {
  /* setup env */
  const dotenv = require('dotenv');
  dotenv.config({ path: path.join(__dirname, './test.env') });

  /* setup http client */
  const {
    PARSE_SERVER_APPLICATION_ID,
    PARSE_SERVER_JAVASCRIPT_KEY,
    PARSE_SERVER_URL,
  } = process.env;
  axios.defaults.baseURL = PARSE_SERVER_URL;
  axios.interceptors.request.use(config => ({
    ...config,
    headers: {
      'X-Parse-Application-Id': PARSE_SERVER_APPLICATION_ID,
      'X-Parse-Javascript-Key': PARSE_SERVER_JAVASCRIPT_KEY,
      ...config.headers,
    },
  }));

  /* setup server */
  const { server } = require('server/server');
  server.setTimeout(3000);
});

afterAll(() => {
  console.log('all tests done, closing server...');
  const { server } = require('server/server');
  server.close(() => {
    console.log('server closed.');
  });
});

it('can start server', () => {
  return axios
    .get('/health')
    .then((res) => {
      expect(res.status).toBe(200);
    });
});