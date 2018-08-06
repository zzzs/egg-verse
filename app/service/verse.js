const Service = require('egg').Service;

class VerseService extends Service {
  async list() {
    const ret = await this.ctx.model.Verse.find({});
    return ret;
  }

  async create(data) {
    const ret = await this.ctx.model.Verse.create(data);
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

