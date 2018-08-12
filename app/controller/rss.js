'use strict';

const Controller = require('egg').Controller

const convert = require('data2xml')();

class RssController extends Controller {

  async index() {
    const config = this.config.rss;
    if (!config) {
      this.ctx.status = 404;
      this.ctx.body = 'Please set `rss` in config.js';
      return;
    }

    const data = await this.ctx.service.verse.list({}, 0, config.max_rss_items);
    const rss_obj = {
      _attr: { version: '2.0' },
      channel: {
        title: config.title,
        link: config.link,
        language: config.language,
        description: config.description,
        item: [],
      },
    };
    data.forEach(item => {
      rss_obj.channel.item.push({
        title: item.title,
        link: config.link + '/verse/' + item._id,
        guid: config.link + '/verse/' + item._id,
        description: item.content,
        pubDate: item.ctime.toUTCString(),
      });
    });
    let rssContent = convert('rss', rss_obj);
    this.ctx.body = rssContent;
  }
}

module.exports = RssController;
