'use strict';

const Controller = require('egg').Controller;

class VerseController extends Controller {
  async add() {
    const { ctx } = this;
    let data = {
      title: '标题',
      content: '内容',
      abstract: '摘要'
      // author_id: 1
    };
    await this.ctx.service.verse.create(data);
    ctx.body = { errorcode: 0 };
  }

}

module.exports = VerseController;
