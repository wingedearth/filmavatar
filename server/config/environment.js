var _ = require('lodash');

require('dotenv').load();

var localEnvVars = {
  TITLE:      'filmavatar',
  SAFE_TITLE: 'filmavatar',
  SECRET_KEY: 'dowhatthouwiltshallbethewholeofthelaw'
}

module.exports = _.extend(process.env, localEnvVars);
