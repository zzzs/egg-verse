const Service = require('egg').Service;

class UserService extends Service {
  async create(data) {
    const ret = await this.ctx.model.User.create(data);
    return ret;
  }

  async findByName(name) {
    const ret = await this.findOne({name: name});
    return ret;
  }

  async findOne(data) {
    const ret = await this.ctx.model.User.findOne(data);
    return ret;
  }
}

module.exports = UserService;


