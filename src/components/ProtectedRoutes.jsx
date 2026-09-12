import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Spinner } from "./Spinner";

export default function ProtectedRoutes() {
  const { user, isPending } = useUser();

  if (isPending) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
