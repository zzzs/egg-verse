'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async index2() {
    this.ctx.body = 'hi, egg2';
  }
}

module.exports = HomeController;
