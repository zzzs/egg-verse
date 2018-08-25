'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // mongo config
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/xl_verse',
      options: {},
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
    prefix: 'xlverse_'
  }

  return config;
};
