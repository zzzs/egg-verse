'use strict';

const mm = require('egg-mock');
const app = mm.app();

const name = process.argv.splice(2);

const scheduleFunc = async () => {
  await app.ready();
  await app.runSchedule(name[0]);
  app.close()
}

scheduleFunc();
