'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async index2() {
    let data = await this.ctx.model.User.find({}).exec();
    console.log(data);
    await this.ctx.render('hello.html', { data: data });
  }
}

module.exports = HomeController;
