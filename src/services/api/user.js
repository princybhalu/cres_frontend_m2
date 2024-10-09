import http from '../http'; 

// memebers
export const getUserByEmail = (email) =>  {
    return  http.get({
      url: 'user?email=' + email,
      messageSettings: { hideSuccessMessage: true , hideErrorMessage: true },
    });
  }

  export const sendInviteToUser = (body) => {
    return http.post({
      url: "user/invite",
      data: body,
      messageSettings : {}
    })
  }

  export const updatePermissionOfUserForProject = (body , projectId , userId) => {
    
    return http.put({
      url: "permission",
      data: body ,
      config: {
        headers:{
          "x-project-id" : projectId,
          "x-user-id" : userId
        }
      }
    })
  }


  export const getUsersListByIds = (body) => {
    return http.post({
      url: "user/get-users-by-ids",
      data: body,
    })
  }

export const activateUser = (body) => {
  console.log("body" , body);
  
  return http.post({
    url: "user/activate",
    data:body ,
    messageSettings : {}
  })
}
