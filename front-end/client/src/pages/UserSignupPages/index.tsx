import React from 'react';
import { ChangeEvent, useState } from 'react';
import './style.css';
import axios, {AxiosError, AxiosResponse} from 'axios';

export function UserSignUpPage(){
    const[form, setForm] = useState({
        displayname: '',
        username: '',
        password: '',
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = event.target;

        setForm((previousForm)=>{
            return {
                ...previousForm,
                [name]: value,
            }
        });
    };

    const onClickSignup = () => {
        const user = {
            displayName: form.displayname,
            username: form.username,
            password: form.password,
        }
        console.log(user)
        console.log(form)
        axios.post("http://localhost:8025/users", user)
    };

    return (
        <>
            <main className="form-signup xw-100 m-auto">
                <form >
                    <div className="text-center">
                        <h1 className="h3 mb-3 fw-normal">Novo Usuário</h1>
                    </div>
                    <div className="form-floating">
                        <input 
                            id="displayname" 
                            name='displayname' 
                            className="form-control" 
                            type="text" 
                            placeholder="Informe o nome"
                            onChange={onChange} // Sera chamada sempre que o valor do campo for alterado
                        />
                        <label htmlFor="displayname">Informe seu nome</label>
                    </div>

                    <div className="form-floating">
                        <input
                            id="username"
                            name="username"
                            className="form-control" 
                            type="text" 
                            placeholder="Informe o seu usuário"
                            onChange={onChange}
                        />
                        <label htmlFor="username">Informe o usuário</label>
                    </div>

                    <div className="form-floating">
                        <input
                            id="password"
                            name="password"
                            className="form-control" 
                            type="password"
                            placeholder="Informe a sua senha" 
                            onChange={onChange}
                        />
                        <label htmlFor="password">Informe a senha</label>
                    </div>

                    <button type="button" className="w-100 btn btn-lg btn-primary mb-3" onClick={onClickSignup}>
                        Cadastrar
                    </button>
                </form>
            </main>
        </>
    );
}