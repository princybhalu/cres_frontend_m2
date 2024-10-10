import http from '../http';

export const loginUser = (body ) => {
  return http.post({
    url: 'http://34.196.219.106:4000/user/login',
    config: {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
    data: body,
    messageSettings: { successMessage: 'Login Successfully' },
  });
};