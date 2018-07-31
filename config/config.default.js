'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532908499083_8935';

  // add your config here
  config.middleware = [];

  // mongo config
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/test',
      options: {},
    },
  };

  // ejs config
  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs',
    },
  };
  config.ejs = {};

  return config;
};
