import axios from 'axios';

export default {
  config({
    PARSE_SERVER_URL,
    PARSE_SERVER_APPLICATION_ID,
    PARSE_SERVER_JAVASCRIPT_KEY,
    PARSE_SERVER_MASTER_KEY,
  }) {
    this.axios = axios.create({
      baseURL: PARSE_SERVER_URL,
      headers: {
        'X-Parse-Application-Id': PARSE_SERVER_APPLICATION_ID,
        'X-Parse-Javascript-Key': PARSE_SERVER_JAVASCRIPT_KEY,
        'X-Parse-Master-Key': PARSE_SERVER_MASTER_KEY,
      },
    });
  },

  request() {
    if (!this.axios) {
      this.config(process.env);
    }
    return this.axios;
  },
};
