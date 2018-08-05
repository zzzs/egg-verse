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
}

module.exports = VerseService;

