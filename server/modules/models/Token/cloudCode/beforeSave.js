/* eslint-disable camelcase */
import R from 'ramda';
import request from 'axios';
import { stringify } from 'query-string';

const beforeSave = (props, req, res) => {
  const { access_token } = req.object.toJSON();
  return Promise.resolve(req.object.existed())
    .then(
      R.when(R.not, () =>
        request.post(
          'https://notify-api.line.me/api/notify',
          stringify({
            message: 'Hello World',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${access_token}`,
            },
          },
        ),
      ),
    )
    .then(() => res.success())
    .catch(R.compose(res.error, R.toString));
};

export default R.curry(beforeSave);
