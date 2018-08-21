'use strict';

const LocalStrategy = require('passport-local').Strategy;
const Loader = require('Loader');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
// const is = require('is-type-of');
// const assert = require('assert');

module.exports = app => {

  // app.router.group = (groupOptions, cb) => {
  //   const name = groupOptions.name | '';
  //   const prefix = groupOptions.prefix | '';
  //   const middlewares = groupOptions.middlewares | [];

  //   // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  //   const proxy = new Proxy(app.router, {
  //     get(target, property) {
  //       const fn = target[property];
  //       const fnProxy = new Proxy(fn, {
  //         apply(targetFn, ctx, args) {
  //           // egg-core\lib\utils\router.js#spliteAndResolveRouterParams()
  //           if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
  //             // app.get(name, url, [...middleware], controller)
  //             args[0] = joinStr(name, args[0]);
  //             args[1] = joinStr(prefix, args[1]);
  //             args.splice(2, 0, ...middlewares);
  //           } else {
  //             // app.get(url, [...middleware], controller)
  //             args[0] = joinStr(prefix, args[0]);
  //             args.splice(1, 0, ...middlewares);
  //           }
  //           // return targetFn.apply(ctx, args);
  //           // es6 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
  //           return Reflect.apply(targetFn, ctx, args);
  //         },
  //       });
  //       return fnProxy;
  //     },
  //   });
  //   cb(proxy);
  // };


  app.locals.Loader = Loader;
  app.locals.config = app.config;
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
