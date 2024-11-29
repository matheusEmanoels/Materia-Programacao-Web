import {api} from "@/lib/axios"
import { IUserSignup } from "@/commons/interfaces";
import { IUserLogin } from "@/commons/interfaces";

const signup = async(user: IUserSignup) =>{
    let response;
    try{
        response = await api.post("/users", user)
    }catch(error: any){
        response = error.response
    }
    return response;
    
};

const login = async (user: IUserLogin) =>{
    let response;
    try{
        response = await api.post("/login", user)
    }catch(error: any){
        response = error.response;
    }
    return response
}

const AuthService = {
    signup,
    login,
}

export default AuthService;