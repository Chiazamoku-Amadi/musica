import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken =
    useAppSelector((state) => state.auth.accessToken) ||
    localStorage.getItem("access_token");

  // If the user is not logged in, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, allow access to the requested route
  return children;
};

export default ProtectedRoute;
