'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532908499083_8935';

  // add your config here
  config.middleware = [ 'userAuth', 'errorPage' ];

  config.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: 'v_csrf' // 通过 body 传递 CSRF token 的默认字段为 _csrf
    }
  };

  // mongo config
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/xl_verse',
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
  // config.ejs = {};
  config.ejs = {
    layout: 'layout/home.html',
  };

  return config;
};
