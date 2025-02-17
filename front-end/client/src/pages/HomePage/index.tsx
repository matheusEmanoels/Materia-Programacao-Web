import ProductService from "@/service/ProductService"
import { ProductCard } from "@/components/CardsProducts"
import { IProductCard } from "@/commons/interfaces";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar";

export function HomePage(){
    const [data, setData] = useState<IProductCard>([]);
    const [apiError, setApiError] = useState("");

    useEffect(()=>{
        loadData();
    },[])
    

    const loadData = async() =>{
        const response = await ProductService.findAll();

        if(response.status === 200){
            setData(response.data);
        }else{
            setApiError("Falha ao carregar a lista de categorias!")
        }
    }

    const adicionarAoCarrinho = (id : number) =>{
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produtoSelecionado = data.find((prod : IProductCard) => prod.id === id);
    
        if (produtoSelecionado) {
            produtoSelecionado.quant = 1;
            carrinho.push(produtoSelecionado);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert("Produto adicionado ao carrinho.");
        } else {
            alert("Produto não encontrado.");
        }
    }

    return(
        <>
            <NavBar/>
            <main className="container">
                <section className="py-5 bg-light">
                    <div className="container text-center">
                        <h2 className="mb-4">Escolha seus Produtos</h2>
                        <div id="cards" className="row card-container">
                            {data.map((prodCard : IProductCard) =>{
                                return(
                                    <ProductCard 
                                    id = {prodCard.id}
                                    imageUrl = "https://placehold.co/200x300"
                                    name = {prodCard.name}
                                    description = ""
                                    price = {prodCard.price}
                                    onAddToCart = {() => adicionarAoCarrinho(prodCard.id)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}