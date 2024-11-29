import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignUpPage } from "@/pages/UserSignupPages";
import { HomePage } from "@/pages/HomePage";


export function BaseRoutes(){
    return(
        <Routes>
           {/*Public Routes */}
           <Route path="/signup" element={<UserSignUpPage/>}/>
           <Route path="/login" element={<LoginPage/>}/>

            {/*Protected Routes*/}
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
    )
}