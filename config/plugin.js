'use strict';
const path = require('path');

exports.xllog = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-xllog'),
};

// exports.xl = {
//   enable: true,
//   package: 'egg-xl',
// };

exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
};

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
