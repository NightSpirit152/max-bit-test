import { useContext } from "react";
import { AuthContext } from "../components/AuthContext.ts";

export const useAuth = () => useContext(AuthContext);
