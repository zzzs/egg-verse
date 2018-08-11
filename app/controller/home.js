'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let len = 16;
    let data = [];
    for (var i = 0; i < len; i++) {
        data.push(i);
    }
    let type = this.ctx.query.type;
    let where = {};
    if (type !== undefined) {
      where.type = type;
    }
    let title = this.ctx.query.title;

    if (type !== undefined) {
      where.title = {$regex: title, $options: 'i'};
    }
    data = await this.ctx.service.verse.list(where);
    await this.ctx.render('home/index', {data: data});
  }

  async about() {
    await this.ctx.render('home/about');
  }
}

module.exports = HomeController;
