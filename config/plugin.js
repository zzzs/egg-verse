'use strict';
const path = require('path');

exports.xllog = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-xllog'),
};

exports.routergroup = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-router-group'),
};

exports.xl = {
  enable: true,
  package: 'egg-xl',
};

// had enabled by egg
// exports.static = true;

// exports.mongoose = {
//   enable: true,
//   package: 'egg-mongoose',
// };

// exports.redis = {
//   enable: true,
//   package: 'egg-redis',
// };

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
