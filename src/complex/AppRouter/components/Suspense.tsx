import {
  type FC,
  type PropsWithChildren,
  Suspense as ReactSuspense,
} from "react";
import { Spin } from "antd";

export const Suspense: FC<PropsWithChildren> = ({ children }) => {
  return <ReactSuspense fallback={<Spin />}>{children}</ReactSuspense>;
};
