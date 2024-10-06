import http from '../http'; 

// memebers
export const getUserByEmail = (email) =>  {
    return  http.get({
      url: '/user?email=' + email,
      messageSettings: { hideSuccessMessage: true , hideErrorMessage: true },
    });
  }

  export const sendInviteToUser = (body) => {
    return http.post({
      url: "/user/invite",
      data: body,
    })
  }

  export const updatePermissionOfUserForProject = (body , projectId , userId) => {
    
    return http.put({
      url: "/permission",
      data: body ,
      config: {
        headers:{
          "x-project-id" : projectId,
          "x-user-id" : userId
        }
      }
    })
  }