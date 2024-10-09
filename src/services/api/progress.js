import http from '../http';

export const chnageStatusOfProgress = (body , projectId) => {
  return http.put({
    url: '/progress/status',
    data: body,
    messageSettings: { successMessage: 'Successfully Updated Status' },
    config: {
        headers: {
          "x-project-id": projectId,
        },
      },
  });
};

export const addCommentsOfProgress = (body , projectId) => {
  return http.post({
    url: '/progress/comment',
    data: body,
    messageSettings: {},
    config: {
        headers: {
          "x-project-id": projectId,
        },
      },
  });
};

export const addImageOfProgress = (body ) => {
  return http.post({
    url: "/progress/image",
    data: body ,
    messageSettings: {},
  });
}