import http from '../http'; 

// memebers
export const getUserByEmail = (email) =>  {
    return  http.get({
      url: 'http://34.196.219.106:4000/user?email=' + email,
      messageSettings: { hideSuccessMessage: true , hideErrorMessage: true },
    });
  }

  export const sendInviteToUser = (body) => {
    return http.post({
      url: "http://34.196.219.106:4000/user/invite",
      config: {
        headers:{
          'Content-Type': 'application/json; charset=utf-8'
        }
      },
      data: body,
      messageSettings : {}
    })
  }

  export const updatePermissionOfUserForProject = (body , projectId , userId) => {
    
    return http.put({
      url: "http://34.196.219.106:4000/permission",
      data: body ,
      config: {
        headers:{
          "x-project-id" : projectId,
          "x-user-id" : userId,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    })
  }


  export const getUsersListByIds = (body) => {
    return http.post({
      url: "http://34.196.219.106:4000/user/get-users-by-ids",
      config:{ headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }},
      data: body,
    })
  }

export const activateUser = (body) => {
  console.log("body" , body);
  
  return http.post({
    url: "http://34.196.219.106:4000/user/activate",
    config:{ headers:{
      'Content-Type': 'application/json; charset=utf-8'
    }},
    data:body ,
    messageSettings : {}
  })
}
