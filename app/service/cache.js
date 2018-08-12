'use strict';

const Service = require('egg').Service;

class CacheService extends Service {
  async get(key) {
    const redisConfig = this.app.config.redis;
    const prefix = redisConfig.prefix;
    const value = await this.app.redis.get(prefix + key);
    return value;
  }

  async set(key, value) {
    const redisConfig = this.app.config.redis;
    const prefix = redisConfig.prefix;
    return await this.app.redis.set(prefix + key, value);
  }
}

module.exports = CacheService;


