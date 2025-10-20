import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MOVIE_INFO_ROUTES, MOVIES_ROUTES } from "../../pages/Movies/routes";
// import { CINEMAS_ROUTES } from "./pages/Cinemas/routes";
// import { MY_TICKETS_ROUTES } from "./pages/MyTickets/routes";
// import { AUTH_ROUTES } from "./pages/Auth/routes";
import type { TAppRoute } from "./types";

const allRoutes: TAppRoute[] = [
  MOVIES_ROUTES,
  MOVIE_INFO_ROUTES,
  // CINEMAS_ROUTES,
  // MY_TICKETS_ROUTES,
  // AUTH_ROUTES,
];

const AppRouter: React.FC = () => {
  return (
    <Switch>
      {allRoutes.map((route) => (
        <Route
          key={route.url}
          path={route.url}
          exact={true}
          render={() => route.component}
        />
      ))}
      <Redirect exact from="/" to="/movies" />
      <Redirect to="/movies" />
    </Switch>
  );
};

export default AppRouter;
