import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "@/components/NavBar";

export function ProdutoDetalhe() {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [apiError, setApiError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadData(Number(id));
        }
    }, [id]);

    const loadData = async (id: number) => {
        const response = await ProductService.findById(id);

        if (response.status === 200) {
            setProduct(response.data); 
        } else {
            setApiError("Falha ao carregar o produto!");
        }

    };

    const adicionarAoCarrinho = (id: number) => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]"); 
        if (!product) {
            alert("Produto não encontrado.");
            return;
        }
    
        const produtoSelecionado = { ...product, quant: 1 }; 
        carrinho.push(produtoSelecionado); 
        localStorage.setItem("carrinho", JSON.stringify(carrinho)); 
        alert("Produto adicionado ao carrinho.");
    };

    return (
        
        <main >
            <NavBar/>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row shadow rounded p-4">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img
                            src={product?.imageUrl || "https://placehold.co/300x300"} 
                            alt={product?.name || "Imagem do Produto"}
                            className="img-fluid rounded"
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                            />
                    </div>
                    <div className="col-md-6 produto-detalhes">
                        <h1 className="mb-3">{product?.name}</h1>
                        <h4 className="text-primary mb-3">R$ {product?.price?.toFixed(2)}</h4>
                        <p>
                            <strong>Descrição:</strong> {product?.description}
                        </p>
                        <button
                            className="btn btn-success btn-lg mt-3"
                            onClick={() => adicionarAoCarrinho(product?.id!)}
                            >
                            <i className="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
