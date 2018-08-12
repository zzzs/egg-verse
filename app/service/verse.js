'use strict';

const Service = require('egg').Service;

class VerseService extends Service {
  async list(where, page, pageSize) {
    const ret = await this.ctx.model.Verse
      .find(where)
      .limit(pageSize)
      .skip(page);
    return ret;
  }

  async listCount(where) {
    const ret = await this.ctx.model.Verse.count(where);
    return ret;
  }

  async create(data) {
    const ret = await this.ctx.model.Verse.create(data);
    return ret;
  }

  async create(data) {
    const ret = await this.ctx.model.Verse.create(data);
    return ret;
  }

  async update(where, data) {
    const ret = await this.ctx.model.Verse.update(where, data);
    return ret;
  }

  async findOneById(_id) {
    const ret = await this.findOne({_id: _id});
    return ret;
  }

  async findOne(data) {
    const ret = await this.ctx.model.Verse.findOne(data);
    return ret;
  }
}

module.exports = VerseService;
