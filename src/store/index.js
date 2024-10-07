// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import projectsReducer from "./projectsSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     projects: projectsReducer
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './userSlice';
import projectsReducer from "./projectsSlice";

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // key is required for redux-persist to know where to store the data
  storage, // defines which storage engine to use
};

const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  projects: persistReducer(persistConfig, projectsReducer),
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store); // Create a persistor for the store
