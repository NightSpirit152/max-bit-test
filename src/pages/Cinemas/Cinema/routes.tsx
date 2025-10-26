import type { TAppRoute } from "../../../complex/AppRouter/types";
import { Suspense } from "../../../complex/AppRouter/components/Suspense.tsx";
import { Cinema } from "./Cinema.tsx";

export const CINEMA_INFO_ROUTES: TAppRoute = {
  url: `/cinemas/cinema`,
  title: "Кинотеатр",
  component: (
    <Suspense>
      <Cinema />
    </Suspense>
  ),
};
