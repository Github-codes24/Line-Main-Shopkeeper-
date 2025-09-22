import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoute() {
    const token = sessionStorage.getItem("token"); // or your auth state

    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
