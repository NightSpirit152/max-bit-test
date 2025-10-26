import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import Login from "./index.tsx";

export const LOGIN_ROUTES: TAppRoute = {
  url: "/login",
  title: "Вход",
  component: (
    <Suspense>
      <Login />
    </Suspense>
  ),
};
