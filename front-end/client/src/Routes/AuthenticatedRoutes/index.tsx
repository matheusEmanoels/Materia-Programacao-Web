import AuthService from "@/service/AuthService"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";

export function AuthenticationRoutes(){
    const isAuthenticaded = AuthService.isAuthenticaded();
    const location = useLocation();

    return isAuthenticaded ? (
        <>
            <Outlet/>
        </>
    ) : (
        <>
            <NavBar/>
            <Navigate to="/login" state={{from : location}} replace/>
        </>
    )
}