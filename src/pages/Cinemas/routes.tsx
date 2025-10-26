import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import { CINEMA_INFO_ROUTES } from "./Cinema/routes.tsx";
import Cinemas from "./index.tsx";

export const CINEMAS_ROUTES: TAppRoute = {
  url: "/cinemas",
  title: "Кинотеатры",
  children: [CINEMA_INFO_ROUTES],
  component: (
    <Suspense>
      <Cinemas />
    </Suspense>
  ),
};
