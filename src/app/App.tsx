import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { NotificationWrapper } from "../features/notification-wrapper";
import { history, store } from "../lib/store";
import HomePage from "../pages/home/HomePage";
import { RoutePath } from "./routes";

const LoginPage = React.lazy(() => import("../pages/login/Login"));

function Root() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  );
}

function App() {
  return (
    <Router history={history}>
      <React.Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
        <NotificationWrapper />
      </React.Suspense>
    </Router>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<HomePage />} />
      <Route path={RoutePath.Login}>
        <Route index element={<LoginPage />} />
        <Route path={RoutePath.LoginWithType} element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default Root;
