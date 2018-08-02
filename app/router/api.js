module.exports = app => {
  const { router, controller } = app;
  router.get('/aaa', controller.home.index2);
  router.get('/verse/add', controller.verse.add);
};

