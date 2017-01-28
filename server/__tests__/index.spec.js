import 'dotenv/config';
import axios from 'axios';

import { server } from '../server';

jest.useFakeTimers();

const {
  PARSE_SERVER_APPLICATION_ID,
  PARSE_SERVER_JAVASCRIPT_KEY,
  PARSE_SERVER_URL,
} = process.env;

afterAll(() => {
  console.log('all tests done');
  server.close();
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
