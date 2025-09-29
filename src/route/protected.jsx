import {Navigate, Outlet} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {shopkeeperLoginAtom} from "../state/auth/authState";

function ProtectedRoute() {
    const {isAuthenticated} = useRecoilValue(shopkeeperLoginAtom);
    const token = sessionStorage.getItem("token");

    return token && isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
