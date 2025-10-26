import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import Booking from "./index.tsx";

export const BOOKING_ROUTES: TAppRoute = {
  url: "/booking",
  title: "Бронирование мест",
  component: (
    <Suspense>
      <Booking />
    </Suspense>
  ),
};
