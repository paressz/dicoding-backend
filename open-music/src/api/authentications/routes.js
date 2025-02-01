const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: (request, h) => handler.addRefreshTokenHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: (request) => handler.updateAccessToken(request),
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: (request) => handler.deleteRefreshToken(request),
  },
];

module.exports = routes;