import http from "../http";

export const getProjectListForDashboard = (filterData) => {
  // TODO : create formate to pass filter data
  console.log({ filterData });
  return http.get({
    url: "/project",
    messageSettings: { hideSuccessMessage: true },
  });
};

export const addProjectApiCall = (body) => {
  return http.post({
    url: "/project",
    data: body,
    messageSettings: { successMessage: "Added Sccessfully" },
  });
};

export const getOneProjectData = (projectId) => {
  return http.get({
    url: "/project/" + projectId,
    messageSettings: { hideSuccessMessage: true },
  });
};

// memebers
export const getMembersOfProject = (projectId) => {
  return http.get({
    url: "/project/members",
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
    url: "/progress",
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
    url: "/progress",
    data: body,
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
  });
};

//task
export const getTaskOfProject = (projectId) => {
  return http.get({
    url: "/task",
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
};

export const addTaskOfProject = (body, projectId) => {
  return http.post({
    url: "/task",
    data: body,
    config: {
      headers: {
        "x-project-id": projectId,
      },
    },
  });
};
