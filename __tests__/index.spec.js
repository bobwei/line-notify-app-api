/* eslint-disable global-require */
import 'dotenv/config';
import axios from 'axios';

jest.useFakeTimers();

const {
  PARSE_SERVER_APPLICATION_ID,
  PARSE_SERVER_JAVASCRIPT_KEY,
  PARSE_SERVER_URL,
} = process.env;

beforeAll(() => {
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

it('can start server', () => (
  axios
    .get(`${PARSE_SERVER_URL}/health`, {
      headers: {
        'X-Parse-Application-Id': PARSE_SERVER_APPLICATION_ID,
        'X-Parse-Javascript-Key': PARSE_SERVER_JAVASCRIPT_KEY,
      },
    })
    .then((res) => {
      expect(res.status).toBe(200);
    })
));
