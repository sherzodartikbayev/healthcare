import { Navigate } from "react-router-dom";
import {useAuthStore} from "../../stores/auth.store.ts";
import type {ChildProps} from "../../types";
import Loading from "./loading.tsx";

const ProtectedRoute = ({ children }: ChildProps) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
