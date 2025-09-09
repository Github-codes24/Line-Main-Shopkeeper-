import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = () => {
  const { auth } = useContext(AuthContext);
  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
