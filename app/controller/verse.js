'use strict';

const BaseController = require('./base');

class VerseController extends BaseController {
  async index() {
    await this.ctx.render('verse/add.html', {action: 'add'});
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
    let author_id = ctx.user._id;
    const id = ctx.params.id;
    let data = {
      _id: id,
      author_id
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

  async update() {
    const { ctx } = this;
    const verseId = ctx.request.body.id;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    const abstract = ctx.request.body.abstract;
    const user = ctx.user;

    let where = {
      _id: verseId,
      author_id: user._id
    };
    let verse = await this.ctx.service.verse.findOne(where);

    // todo admin
    if (!verse) {
      ctx.status = 403;
      ctx.errormsg = '对不起，你不能编辑此话题';
      return;
    }
    let data = {
      title,
      content,
      abstract
    };
    await this.ctx.service.verse.update(where, {$set: data});
    await this.ctx.redirect('/verse/' + verseId);
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
