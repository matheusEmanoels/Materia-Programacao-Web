import { useEffect, useState } from "react";
import { CarrinhoCard } from "@/components/Carrinho";
import { IOrder, IProductOrder } from "@/commons/interfaces";
import OrderService from "@/service/OrderService";
import AuthService from "@/service/AuthService";
import { NavBar } from "@/components/NavBar";
import { useNavigate } from "react-router-dom";

export function CarrinhoCompra() {
    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        setProdutos(carrinho);

        const totalCarrinho = carrinho.reduce((acc, item) => acc + item.price * item.quant, 0);
        setTotal(totalCarrinho);
    }, []);

    const atualizarQuantidade = (id, novaQuantidade) => {
        const carrinhoAtualizado = produtos.map((item) =>
            item.id === id ? { ...item, quant: novaQuantidade } : item
        );
        setProdutos(carrinhoAtualizado);
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));

        const novoTotal = carrinhoAtualizado.reduce((acc, item) => acc + item.price * item.quant, 0);
        setTotal(novoTotal);
    };

    const removerProduto = (id) => {
        const carrinhoAtualizado = produtos.filter((item) => item.id !== id);
        setProdutos(carrinhoAtualizado);
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));

        const novoTotal = carrinhoAtualizado.reduce((acc, item) => acc + item.price * item.quant, 0);
        setTotal(novoTotal);
    };

    const transformDataToOrder = async(): IOrder =>{
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        const productOrders: IProductOrder[] = carrinho.map(item => ({
            quantity: item.quant,
            unitPrice: item.price,
            product: {
                id : item.id,
            },
        }));
    
        const totalPrice = carrinho.reduce((sum, item) => sum + item.price * item.quant, 0);
        const responseUser = await AuthService.getUser();
        console.log(responseUser.data.id)
        const order: IOrder = {
            price: totalPrice,
            date: "2024-10-31",
            userId: {
                id: responseUser.data.id,
            },
            productOrders: productOrders,
        };
    
        const response = await OrderService.save(order);
        
        console.log(response.status);
        if(response.status === 201 || response.status === 200){
            alert("Compra finalizada com sucesso");
            localStorage.removeItem("carrinho");
        }else if(response.status === 401){
            alert("Você nao esta logado para finalizar a compra faça o login!");
            navigate("/login")
        }else{
            alert("Compra sem sucesso");
        }
    };

    return (
        <main>
            <NavBar/>
            <CarrinhoCard
                produtos={produtos}
                total={total}
                atualizarQuantidade={atualizarQuantidade}
                removerProduto={removerProduto}
            />

            <button className="btn btn-primary btn-lg d-block mx-auto mt-4" onClick={transformDataToOrder}>Finalizar Compra</button>
        </main>
    );
}
