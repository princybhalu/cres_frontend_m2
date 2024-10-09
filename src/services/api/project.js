import http from "../http";

export const getProjectListForDashboard = (filterData) => {
  // TODO : create formate to pass filter data
  console.log({ filterData });
  return http.get({
    url: "http://34.196.219.106:4000/project",
    messageSettings: { hideSuccessMessage: true },
  });
};

export const addProjectApiCall = (body) => {
  return http.post({
    url: "http://34.196.219.106:4000/project",
    data: body,
    messageSettings: { successMessage: "Added Sccessfully" },
  });
};

export const getOneProjectData = (projectId) => {
  return http.get({
    url: "http://34.196.219.106:4000/project/" + projectId,
    messageSettings: { hideSuccessMessage: true },
  });
};

// memebers
export const getMembersOfProject = (projectId) => {
  return http.get({
    url: "http://34.196.219.106:4000/project/members",
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
};

//progrss
export const getProgessOfProject = (projectId) => {
  return http.get({
    url: "http://34.196.219.106:4000/progress?type=progress",
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
};

export const addProgessOfProject = (body, projectId) => {
  return http.post({
    url: "http://34.196.219.106:4000/progress",
    data: body,
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
  });
};

export const getOneProgessDetails = (progressId, projectId) => {
  return http.get({
    url: "http://34.196.219.106:4000/progress/" + progressId ,
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
  });
};

export const getResourceOfProject = (projectId) => {
  return http.get({
    url: "http://34.196.219.106:4000/progress?type=resource",
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
};


export const getWorkPermitOfProject = (projectId) => {
  return http.get({
    url: "http://34.196.219.106:4000progress?type=workpermit",
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
};