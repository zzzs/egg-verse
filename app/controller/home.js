'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    let len = 90;
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

    if (title !== undefined && title !== '') {
      where.title = {$regex: title, $options: 'i'};
    }

    const verseConfig = this.config.verse;
    const pageSize = verseConfig.list_col * verseConfig.list_row;
    const showPageNum = verseConfig.page_num;
    let page = 1;
    if (this.ctx.query.page !== undefined) {
      page = parseInt(this.ctx.query.page);
    }
    let skipNum = (page - 1) * pageSize;
    // let total = data.length;
    let total = await this.ctx.service.verse.listCount(where);

    let pageNum = Math.ceil(total / pageSize);
    data = data.slice(skipNum, skipNum + pageSize);
    if (data.length === 0) {
      return await this.ctx.redirect('/');
    }
    data = await this.ctx.service.verse.list(where, skipNum, pageSize);
    await this.ctx.render('home/index', {data, pageNum, curPage: page, type: type});
  }

  async about() {
    await this.ctx.render('home/about');
  }
}

module.exports = HomeController;
