'use strict';

const Controller = require('egg').Controller;

class VerseController extends Controller {
  async index() {
    await this.ctx.render('verse/add.html');
  }

  async add() {
    const { ctx } = this;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const abstract = ctx.request.body.abstract;
    const author_id = ctx.user._id;
    let data = {
      title: title,
      content: content,
      abstract: abstract,
      author_id: author_id
    };
    await this.ctx.service.verse.create(data);
    ctx.redirect('/');
  }

}

module.exports = VerseController;
