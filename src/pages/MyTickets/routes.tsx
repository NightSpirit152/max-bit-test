import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import Booking from "./index.tsx";

export const MY_TICKETS_ROUTES: TAppRoute = {
  url: "/my-tickets",
  title: "Мои билеты",
  component: (
    <Suspense>
      <Booking />
    </Suspense>
  ),
};
