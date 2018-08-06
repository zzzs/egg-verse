'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let len = 16;
    let data = [];
    for (var i = 0; i < len; i++) {
        data.push(i);
    }
    data = await this.ctx.service.verse.list();
    await this.ctx.render('home/index', {data: data});
  }

  async about() {
    await this.ctx.render('home/about');
  }
}

module.exports = HomeController;
