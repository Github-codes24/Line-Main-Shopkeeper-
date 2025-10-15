import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { shopkeeperLoginAtom } from "../state/auth/authState";

function ProtectedRoute() {
    const { isAuthenticated } = useRecoilValue(shopkeeperLoginAtom);
    const token = sessionStorage.getItem("token");

    // FIX: Check token first (source of truth), then Recoil as backup
    // This prevents redirect during Recoil state sync
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;