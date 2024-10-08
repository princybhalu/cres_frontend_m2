import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: {},
};

const projectsSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.project = { ...action.payload};
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload.id); // Remove the project by ID
    },
  },
});

// Export the actions
export const { addProject, removeProject } = projectsSlice.actions;

// Export the selector to get project details
export const selectProjects = (state) => state.project.project;

// Export the reducer
export default projectsSlice.reducer;
