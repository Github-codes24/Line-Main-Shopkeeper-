import {Navigate, Outlet} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {shopkeeperLoginAtom} from "../state/smallproduct/auth/authState";

function ProtectedRoute() {
    const {isAuthenticated} = useRecoilValue(shopkeeperLoginAtom);
    const token = sessionStorage.getItem("token");
    const isVerified = sessionStorage.getItem("isVerified") === "true";

    return token && isVerified && isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
