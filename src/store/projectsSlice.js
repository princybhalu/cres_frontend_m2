import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload); // Add the new project
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload.id); // Remove the project by ID
    },
  },
});

// Export the actions
export const { addProject, removeProject } = projectsSlice.actions;

// Export the selector to get project details
export const selectProjects = (state) => state.projects.projects;

// Export the reducer
export default projectsSlice.reducer;
