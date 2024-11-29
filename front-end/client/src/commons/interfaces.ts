export interface IUserSignup{
    displayName: string;
    username: string;
    password: string;
}

export interface IUserLogin{
    username: string;
    password: string;
}

export interface ApiResponse {
    message: string;
    validationErrors: any; 
}