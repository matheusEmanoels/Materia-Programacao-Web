import {  AxiosResponse } from 'axios';
import './style.css';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiResponse } from '@/commons/interfaces';
import { IUserLogin } from '@/commons/interfaces';
import AuthService from '@/service/AuthService';
import { ButtonWithProgress } from '@/components/ButtonWithProgress';

export function LoginPage() {
    /* Criação de um objeto chamado `form` para armazenar o username e passord do usuário*/
    /* useState: Inicializa o estado do formulário com valores vazios para os campos displayName, username e password */
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    /* Criação de um objeto chamado `errors` para armazenar os erros referente a displayName, username e passord do usuário*/
    /* useState: Inicializa o estado para armazenar mensagens de erro relacionadas a cada campo */
    const [errors, setErros] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; 


        setForm((previousForm) => ({
            ...previousForm, // Mantém os valores anteriores de 'form'
            [name]: value, // Atualiza o campo específico com o novo valor
        }));

        /* Limpa o erro do campo editado */
        setErros((previousErrors) => ({
            ...previousErrors,
            [name]: undefined, // Limpa o erro apenas do campo que está sendo editado
        }));

        setApiError("");
    };

    /* Função assíncrona executada quando o botão "Cadastrar" é clicado */
    const onClickLogin = async () => {
        setPendingApiCall(true);
        /* Monta o objeto com os valores do formulário que será enviado ao back-end */
        const user: IUserLogin= {
            username: form.username,
            password: form.password,
        };

        console.log("Meu objeto: " + user.username + " - " + user.password);


        const response: AxiosResponse<ApiResponse> = await AuthService.login(user);
        
        if(response.status === 200){
            setApiSuccess("Login Success");
            setTimeout(()=>{
                navigate("/");
            },3000);
        }else{
            setApiError("Erro ao fazer o login");
            if(response.data.validationErrors){
                console.error("Falha ao autenticar o usuario");
            }
            setPendingApiCall(false);
        }


    };

    return (
        <>
            <main className="form-signup w-100 m-auto">
                <form>
                    <div className="text-center">

                        <h1 className="h3 mb-3 fw-normal">User Login Page</h1>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className={"form-control " + (errors.username ? "is-invalid" : "")}
                            placeholder="Informe o seu usuário"
                            onChange={onChange}
                        />
                        <label htmlFor="username">Informe o usuário</label>
                        {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={"form-control " + (errors.password ? "is-invalid" : "")}
                            placeholder="Informe a sua senha"
                            onChange={onChange}
                        />
                        <label htmlFor="password">Informe a senha</label>
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>

                    <div>
                        {apiError &&(
                            <div className="col-12 mb-3">
                                <div className="alert alert-danger">
                                    {apiError}
                                </div>

                            </div>
                        )}
                        {apiSuccess && (
                            <div className="col-12 mb-3">
                                <div className="alert alert-success">
                                    {apiSuccess}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <ButtonWithProgress
                        onClick = {onClickLogin}
                        disable = {pendingApiCall}
                        pendingApiCall = {pendingApiCall}
                        text = "Login"
                    />
                    
                </form>

                <div className="text-center">
                    <Link to="/signup">Deseja cadastrar-se?</Link>
                </div>
            </main>
        </>
    );
}