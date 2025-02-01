const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (r, h) => handler.registerUserHandler(r, h),
  }
];
module.exports = routes;