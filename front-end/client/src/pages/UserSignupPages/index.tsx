import { AxiosResponse } from 'axios'; 
import './style.css'; 
import { ChangeEvent, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { ApiResponse } from '@/commons/interfaces';
import AuthService from '@/service/AuthService';
import { IUserSignup } from '@/commons/interfaces';

export function UserSignUpPage() {
    /* Criação de um objeto chamado `form` para armazenar o username e passord do usuário*/
    /* useState: Inicializa o estado do formulário com valores vazios para os campos displayName, username e password */
    const [form, setForm] = useState({
        displayName: "",
        username: "",
        password: "",
    });

    /* Criação de um objeto chamado `errors` para armazenar os erros referente a displayName, username e passord do usuário*/
    /* useState: Inicializa o estado para armazenar mensagens de erro relacionadas a cada campo */
    const [errors, setErros] = useState({
        displayName: "",
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    /* Função chamada sempre que ocorre uma mudança em algum campo de input. 
      A cada alteração no campo de entrada, ela atualiza o estado de 'form' e limpa os erros associados ao campo */
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; // Obtém o valor e o nome do campo que disparou o evento

        /* Atualiza o estado do formulário mantendo os valores anteriores e modificando apenas o campo editado */
        setForm((previousForm) => ({
            ...previousForm,
            [name]: value, 
        }));

        /* Limpa o erro do campo editado */
        setErros((previousErrors) => ({
            ...previousErrors,
            [name]: undefined, 
        }));

        setApiError("");
    };

    /* Função assíncrona executada quando o botão "Cadastrar" é clicado */
    const onClickSignup = async () => {
        setPendingApiCall(true);
        const user: IUserSignup = {
            displayName: form.displayName,
            username: form.username,
            password: form.password,
        };

       const response: AxiosResponse<ApiResponse> = await AuthService.signup(user);

       if(response.status === 200 || response.status === 201){
            setApiSuccess("Cadastro realizado com sucesso");
            setTimeout(()=>{
                navigate("/login");
            },3000)
       }else{
            setApiError("Falha ao cadastrar usuario");
            if(response.data.validationErrors){
                setErros(response.data.validationErrors)
            }
            setPendingApiCall(false);
       }
    };


    return (
        <>
            <main className="form-signup w-100 m-auto">
                <form>

                    <div className="text-center">

                        <h1 className="h3 mb-3 fw-normal">User Signup Page</h1>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            id="displayName"
                            name="displayName"
                            className={"form-control " + (errors.displayName ? "is-invalid" : "")}

                            type="text"
                            placeholder="Informe o seu nome"
                            onChange={onChange}
                        />
                        <label htmlFor="displayName">Informe seu nome</label>
                        {errors.displayName && (<div className="invalid-feedback">{errors.displayName}</div>)}
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

                    <div className="text-center">
                        <button type="button" className="w-100 btn btn-lg btn-primary mb-3" onClick={onClickSignup} disabled={pendingApiCall}>
                            {pendingApiCall &&(
                                  <div className="spinner-border text-light-spinner spinner-border-sm mr-sm-1" role="status">
                                  <span className="visually-hidden">Aguarde</span>
                              </div>
                            )}
                            Cadastrar
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <Link to="/login">Ir para a tela de login</Link>
                </div>
            </main>
        </>
    );
}