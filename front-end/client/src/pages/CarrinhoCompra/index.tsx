import { useEffect, useState } from "react";
import { CarrinhoCard } from "@/components/Carrinho";
import { IOrder, IProductOrder,  IProduct } from "@/commons/interfaces";
import OrderService from "@/service/OrderService";

export function CarrinhoCompra() {
    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState();

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

    const transformDataToOrder = (userId: number): IOrder =>{
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        const productOrders: IProductOrder[] = carrinho.map(item => ({
            quantity: item.quant,
            unitPrice: item.price,
            product: {
                id : item.id,
            },
        }));
    
        const totalPrice = carrinho.reduce((sum, item) => sum + item.price * item.quant, 0);
    
        const order: IOrder = {
            price: totalPrice,
            date: "2024-10-31",
            userId: {
                id: 3,
            },
            productOrders: productOrders,
        };
    
        setOrder(order);
    };

    const finalizaCompra = async() =>{
        transformDataToOrder(1);
        if (!order || !order.productOrders || order.productOrders.length === 0) {
            alert("Pedido Vazio");
        }

        const response = await OrderService.save(order);
        
        console.log(response.status);
        if(response.status === 201 || response.status === 200){
            alert("Compra finalizada com sucesso");
            localStorage.removeItem("carrinho");
        }else{
            alert("Compra sem sucesso");
        }
    }

    return (
        <main>
            <CarrinhoCard
                produtos={produtos}
                total={total}
                atualizarQuantidade={atualizarQuantidade}
                removerProduto={removerProduto}
            />

            <button className="btn btn-primary btn-lg d-block mx-auto mt-4" onClick={finalizaCompra}>Finalizar Compra</button>
        </main>
    );
}
