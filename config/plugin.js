'use strict';

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
