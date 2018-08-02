'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let len = 16;
    let data = [];
    for (var i = 0; i < len; i++) {
        data.push(i);
    }
    await this.ctx.render('home/index', {data: data, Loader: require('Loader')});
  }
  async index2() {
    let data = await this.ctx.model.User.find({}).exec();
    console.log(data);
    await this.ctx.render('hello.html', { data: data });
  }
}

module.exports = HomeController;
