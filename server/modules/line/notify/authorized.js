import R from 'ramda';
import request from 'axios';
import { stringify } from 'query-string';

const authorized = (props, req, res) => {
  const {
    LINE_API_CLIENT_SECRET,
    LINE_API_CLIENT_ID,
    BASE_API_URL,
    Parse,
  } = props;
  const { code } = req.query;
  return request
    .post(
      'https://notify-bot.line.me/oauth/token',
      stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${BASE_API_URL}/api/line/notify/v1/authorized`,
        client_id: LINE_API_CLIENT_ID,
        client_secret: LINE_API_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(R.path(['data']))
    .then(data =>
      new Parse.Object('Token')
        .save(R.pick(['access_token'])(data))
        .then(() => data),
    )
    .then(data => res.json(data))
    .catch(error => {
      console.log(error);
      res.send('error');
    });
};

export default R.curry(authorized);
