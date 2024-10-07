import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store , persistor } from "./store";
import { routes } from "./routes/routes";
import ProtectedRoute from "./routes/protectRoute";
import { PersistGate } from 'redux-persist/integration/react';
import Layout from "./layouts/layout"; 
import NotificationWrapper from "./components/notifiction/Notification";

const App = () => {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>
                      {/* Exclude Layout for specific routes like /login */}
                      {route.layout !== false ? (
                        <Layout>
                          <route.component />
                        </Layout>
                      ) : (
                        <route.component />
                      )}
                    </ProtectedRoute>
                  ) : route.layout !== false ? (
                    <Layout>
                      <route.component />
                    </Layout>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
        </PersistGate>
      </Provider>
      <NotificationWrapper />
    </>
  );
};

export default App;
