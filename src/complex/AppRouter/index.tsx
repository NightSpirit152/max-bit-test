import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MOVIES_ROUTES } from "../../pages/Movies/routes";
// import { CINEMAS_ROUTES } from "./pages/Cinemas/routes";
// import { MY_TICKETS_ROUTES } from "./pages/MyTickets/routes";
// import { AUTH_ROUTES } from "./pages/Auth/routes";
import type { TAppRoute } from "./types";
import { CINEMAS_ROUTES } from "../../pages/Cinemas/routes.tsx";
import { getAllRoutes } from "./utils/getAllRoutes.ts";
import { LOGIN_ROUTES } from "../../pages/Login/routes.tsx";
import { REGISTRATION_ROUTES } from "../../pages/Registration/routes.tsx";
import { BOOKING_ROUTES } from "../../pages/Booking/routes.tsx";
import { MY_TICKETS_ROUTES } from "../../pages/MyTickets/routes.tsx";

const appRoutes: TAppRoute[] = [
  MOVIES_ROUTES,
  CINEMAS_ROUTES,
  LOGIN_ROUTES,
  REGISTRATION_ROUTES,
  BOOKING_ROUTES,
  MY_TICKETS_ROUTES,
  // MY_TICKETS_ROUTES,
  // AUTH_ROUTES,
];

const AppRouter: React.FC = () => {
  const allRoutes = getAllRoutes(appRoutes);

  return (
    <>
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
    </>
  );
};

export default AppRouter;
