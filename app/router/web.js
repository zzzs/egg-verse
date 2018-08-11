module.exports = app => {
  const { router, controller } = app;

  const userRequired = app.middleware.userRequired();

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
  router.post('/verse/add', userRequired, controller.verse.add);
  router.get('/verse/edit/:id', userRequired, controller.verse.edit);
  router.post('/verse/update', userRequired, controller.verse.update);
  router.get('/verse/:id', controller.verse.info);

};
