'use strict';

const is = require('is-type-of');
const assert = require('assert');

/**
 * [funcProxy description]
 * @param  {[type]} funcTarget  [description]
 * @param  {[type]} name        [description]
 * @param  {[type]} prefix      [description]
 * @param  {[type]} middlewares [description]
 * @return {[type]}             [description]
 */
const funcProxy = function (funcTarget, name, prefix, middlewares) {
  return new Proxy(funcTarget, {
    apply(target, ctx, args) {
      // egg-core\lib\utils\router.js#spliteAndResolveRouterParams()
      if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
        // app.get(name, url, [...middleware], controller)
        assert(is.string(args[0]), `only support router-name with string, but got ${args[0]}`);
        assert(is.string(args[1]), `only support router-path with string, but got ${args[1]}`);

        args[0] = joinPrefix(name, args[0]);
        args[1] = joinPrefix(prefix, args[1]);
        args.splice(2, 0, ...middlewares);
      } else {
        // app.get(url, [...middleware], controller)
        assert(is.string(args[0]), `only support router-path with string, but got ${args[0]}`);
        args[0] = joinPrefix(prefix, args[0]);
        args.splice(1, 0, ...middlewares);
      }

      // return target.apply(ctx, args);
      // es6 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
      return Reflect.apply(target, ctx, args);
    }
  });
};

/**
 * [joinPrefix description]
 * @param  {[type]} prefix [description]
 * @param  {[type]} str    [description]
 * @return {[type]}        [description]
 */
const joinPrefix = function (prefix, str) {
  return prefix + str;
};

// except redirect
// https://eggjs.org/zh-cn/basics/router.html
const methods = [ 'head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'del', 'all', 'resources' ];

module.exports = app => {
  app.router.group = (options, cb) => {
    const name = options.name ? options.name : '';
    const prefix = options.prefix ? options.prefix : '';
    const middlewares = options.middlewares ? options.middlewares : [];

    // params validate
    if (!is.array(options.middlewares)) {
      assert(is.function(middlewares), `only support middlewares with function or array, but got ${middlewares}`);
      middlewares = [middlewares];
    }
    assert(is.string(name), `only support name with string, but got ${name}`);
    assert(is.string(prefix), `only support prefix with string, but got ${prefix}`);
    assert(is.array(middlewares), `only support middlewares with function or array, but got ${middlewares}`);

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    const proxy = new Proxy(app.router, {
      get(target, property) {
        const funcTarget = target[property];
        if (!methods.includes(property)) {
          return target[property];
        }
        return funcProxy(funcTarget, name, prefix, middlewares);
      },
    });

    cb(proxy);
  };
}
