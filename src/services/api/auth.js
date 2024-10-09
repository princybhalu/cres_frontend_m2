import http from '../http';

export const loginUser = (body ) => {
  return http.post({
    url: 'user/login',
    data: body,
    messageSettings: { successMessage: 'Login Successfully' },
  });
};