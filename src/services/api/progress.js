import http from '../http';

export const chnageStatusOfProgress = (body , projectId) => {
  return http.put({
    url: 'http://34.196.219.106:4000/progress/status',
    data: body,
    messageSettings: { successMessage: 'Successfully Updated Status' },
    config: {
        headers: {
          "x-project-id": projectId,
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
  });
};

export const addCommentsOfProgress = (body , projectId) => {
  return http.post({
    url: 'http://34.196.219.106:4000/progress/comment',
    data: body,
    messageSettings: {},
    config: {
        headers: {
          "x-project-id": projectId,
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
  });
};

export const addImageOfProgress = (body ) => {
  return http.post({
    url: "http://34.196.219.106:4000/progress/image",
    data: body ,
    config:{
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
    },
    messageSettings: {},
  });
}