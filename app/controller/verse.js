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

  async edit() {
    const { ctx } = this;
    const author_id = ctx.user._id;
    const id = ctx.params.id;
    let data = {
      _id: id,
      author_id: author_id
    };
    let verse = await this.ctx.service.verse.findOne(data);
    // todo admin
    if (!verse) {
      ctx.status = 403;
      ctx.errormsg = '对不起，你不能编辑此话题';
      return;
    }
    await this.ctx.render('verse/add.html', {verse: verse, action: 'edit'});
  }

  async info() {
    const { ctx } = this;
    const id = ctx.params.id;

    let data = await this.ctx.service.verse.findOneById(id);

    if (!data) {
      ctx.status = 403;
      ctx.errormsg = '对不起，不存在此话题';
      return;
    }

    await this.ctx.render('verse/info.html', {verse: data});
  }
}

module.exports = VerseController;
