import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useUser } from "../hooks/useUser";

export default function PublicRoute() {
  const { user, isPending } = useUser();

  if (isPending) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
