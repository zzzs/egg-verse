module.exports = app => {
  const { router, controller } = app;
  router.get('/aaa', controller.home.index2);
  // app.router.get('/news/detail', app.controller.news.detail);
};

