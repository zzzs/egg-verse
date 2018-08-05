'use strict';

const Controller = require('egg').Controller;

var crypto = require('crypto');
var md5 = crypto.createHash('md5');

class UserController extends Controller {
  async index() {
    await this.ctx.render('user/index.html');
  }

  async login() {
    await this.ctx.render('home/login.html');
  }

  async logout() {
    this.ctx.session = null;
    this.ctx.logout();
    this.ctx.redirect('/');
  }

  async register() {
    await this.ctx.render('home/register.html');
  }

  /**
   * 注册
   */
  async add() {
    const { ctx } = this;
    let data = {
      errorcode: 0,
      errormsg: ''
    };
    try {
      ctx.validate({
        username: { type: 'string', min: 5, },
        password: { type: 'string', min: 8 },
        password2: { type: 'string', min: 8 },
      });
    } catch (err) {
      console.log('err', err)
      data.errorcode = 1;
      data.errormsg = '提交信息有误';
      await this.ctx.render('home/register.html', data);
      return;
    }
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const password2 = ctx.request.body.password2;

    if (password2 !== password) {
      data.errorcode = 1;
      data.errormsg = '两次密码不一致。';
      await ctx.render('home/register.html', data);
      return;
    }

    let existUser = await ctx.service.user.findByName(username);
    if (existUser) {
      data.errorcode = 1;
      data.errormsg = '该账号已被注册';
      await ctx.render('home/register.html', data);
      return;
    }
    var passwordMd5 = md5.update(password).digest('hex');
    let userData = {
      name: username,
      password: passwordMd5
    };
    await ctx.service.user.create(userData);
    this.ctx.redirect('/login');
  }
}

module.exports = UserController;

