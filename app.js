'use strict';

const LocalStrategy = require('passport-local').Strategy;
const Loader = require('Loader');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

module.exports = app => {
  app.locals.Loader = Loader;

  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    const user = {
      provider: 'local',
      username,
      password,
    };
    // console.log('%s %s get user: %j', req.method, req.url, user);
    // done(null, user);
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    // 数据库验证
    let existUser = await ctx.service.user.findByName(user.username);
    var passwordMd5 = md5.update(user.password).digest('hex');
    if (existUser.password !== passwordMd5) {
      return null;
    }
    return existUser;
  });
  app.passport.serializeUser(async (ctx, user) => {
    // 序列化 个别字段
    return user;
  });
  app.passport.deserializeUser(async (ctx, user) => {
    // 反序列化
    return user;
  });
}
