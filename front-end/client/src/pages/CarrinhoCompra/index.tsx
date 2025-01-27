import { useEffect, useState } from "react";
import { CarrinhoCard } from "@/components/Carrinho";

export function CarrinhoCompra() {
    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        setProdutos(carrinho);

        const totalCarrinho = carrinho.reduce((acc, item) => acc + item.price * item.quant, 0);
        setTotal(totalCarrinho);
        console.log(totalCarrinho)
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

    return (
        <main>
            <CarrinhoCard
                produtos={produtos}
                total={total}
                atualizarQuantidade={atualizarQuantidade}
                removerProduto={removerProduto}
            />

            <button className="btn btn-primary btn-lg d-block mx-auto mt-4">Finalizar Compra</button>
        </main>
    );
}
