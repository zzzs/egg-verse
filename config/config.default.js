'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.onerror = {
    // 线上页面发生异常时，重定向到这个页面上
    // errorPageUrl: '/xxx.html',
  },

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532908499083_8935';

  // add your config here
  config.middleware = [ 'userAuth', 'errorPage' ];

  config.verse = {
    list_col: 2,
    list_row: 1,
    page_num: 3
  };

  // RSS配置
  config.rss = {
    title: 'XL：verse诗骚',
    link: 'http://127.0.0.1',
    language: 'zh-cn',
    description: 'XL：verse诗骚',
    // 最多获取的RSS Item数量
    max_rss_items: 10,
  };

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

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
    prefix: 'xlverse_'
  }

  config.xl = {
    client: {
      name: 'xiaolei',
      sex: 'boy',
    }
  }

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
