'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async apiResponse(result, errcode, errmsg) {
    errcode = errcode | 0;
    errmsg = errmsg | '';
    this.ctx.body = {
        result,
        errcode,
        errmsg
    }
  }
}

module.exports = BaseController;
