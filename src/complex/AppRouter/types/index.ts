import type { ReactNode } from "react";

export type TAppRoute = {
  url: string;
  title: string;
  component: ReactNode;
  children?: TAppRoute[];
};
