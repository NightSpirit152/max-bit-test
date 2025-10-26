import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import Registration from "./index.tsx";

export const REGISTRATION_ROUTES: TAppRoute = {
  url: "/registration",
  title: "Регистрация",
  component: (
    <Suspense>
      <Registration />
    </Suspense>
  ),
};
