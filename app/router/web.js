module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/about', controller.home.about);


  // 注册
  router.get('/register', controller.user.register);
  router.post('/register', controller.user.add);

  // 渲染登录页面，用户输入账号密码
  router.get('/login', controller.user.login);
  // 登录校验
  router.post('/login', app.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

  router.get('/logout', controller.user.logout);

  router.get('/user', controller.user.index);

  router.get('/verse', controller.verse.index);
  router.post('/verse/add', controller.verse.add);
  router.get('/verse/edit/:id', controller.verse.edit);
  router.get('/verse/:id', controller.verse.info);

};
