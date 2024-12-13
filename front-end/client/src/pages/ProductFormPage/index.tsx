import { IProduct } from "@/commons/interfaces"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "@/service/ProductService";
import { ICategory } from "src/commons/interfaces";
import CategoryService from "@/service/CategoryService";

export function ProductFormPage(){

    const{
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<IProduct>();

    const[apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async()=>{
        setApiError("");

        const responseCategoria = await CategoryService.findAll();

        if(responseCategoria.status === 200){
            setCategories(responseCategoria.data);
        }else{
            setApiError("Falha ao carregar a lista de categorias!");
        }

        if(id){
            const response = await ProductService.findById(Number(id));
            
            if(response.status === 200){
                reset(response.data);
            }else{
                setApiError("Falha ao carregar o produto!");
            }
        }
    }

    const onSubmit = async(product: IProduct) =>{
        const response = await ProductService.save(product);
        if(response.status === 201 || response.status === 200){
            reset();
            navigate("/products");
        }else{
            setApiError("Falha ao salvar a produto");
        }
    }

    return(
        <>
            <main className="container row justify-content-center">
                <form className="form-floating col-md-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center">
                        <h1 className="h3 mb-3 fw-normal">
                            {id ? "Editando Produto" : "Novo Produto"}
                        </h1>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="hidden" {...register("id")}/>
                        <input className={"form-control" + (errors.name ? " is-invalid" : "")} 
                        type="text" 
                        placeholder="Informe o nome do produto"
                        {...register("name",{
                            required: "Campo obrigatório",
                            minLength:{
                                value: 2,
                                message: "Campo deve ter no mínimo 2 caracteres",
                            },
                            maxLength:{
                                value: 100,
                                message: "Campo deve ter no máximo 100 caracteres",
                            },
                        })}
                        />
                        <label htmlFor="name">Informe o nome do produto</label>
                        {errors.name &&(
                            <div className="invalid-feedback">{errors.name.message}</div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="hidden" {...register("id")}/>
                        <input className={"form-control" + (errors.price ? " is-invalid" : "")} 
                        type="text" 
                        placeholder="Informe o preço do produto"
                        {...register("price",{
                            required: "Campo obrigatório",
                        })}
                        />
                        <label htmlFor="price">Informe o preço do produto</label>
                        {errors.price &&(
                            <div className="invalid-feedback">{errors.price.message}</div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <textarea 
                            className={"form-control " + (errors.description ? " is-invalid": "")} 
                            placeholder="Informe a descrição do produto"
                            {...register("description",{
                                required: "Campo obtigatorio",
                            })}
                        />
                        <label htmlFor="description">Informe a descrição do produto</label>
                        {errors.description &&(
                            <div className="invalid-feedback">{errors.description.message}</div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <select
                            className={"form-control " + (errors.category ? " is-invalid" : "")}
                            {...register("category.id",{
                                required: "Campo obrigatorio",
                            })}
                        >
                            <option value="">Selecione a Categoria</option>
                            {categories.map((category) =>(
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="category">Informe a categoria do produto</label>
                        {errors.category &&(
                            <div className="invalid-feedback">{errors.category.message}</div>
                        )}
                    </div>
                    
                    {apiError && <div className="alert alertdanger">{apiError}</div>}
                    <button type="submit" className="w-100 btn btn-lg btn-primary mb-3" disabled={isSubmitting}>Salvar</button>
                </form>
            </main>
        </>
    )
}