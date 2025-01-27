import React from "react";

export function CarrinhoCard({ produtos, total, atualizarQuantidade, removerProduto }) {
    return (
        <div className="container my-4">
            <div id="cardsCarrinho" className="row">
                {produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <div key={produto.id} className="col-md-3 mb-4">
                            <div
                                className="card h-100 shadow-sm"
                                style={{ maxWidth: "18rem", margin: "0 auto" }}
                            >
                                <img
                                    src="https://placehold.co/150x200"
                                    alt={produto.name}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body p-3">
                                    <h6 className="card-title">{produto.name}</h6>
                                    <p className="card-text text-truncate">{produto.description}</p>
                                    <p className="card-text">
                                        <strong>Preço:</strong> R$ {produto.price}
                                    </p>
                                    <div className="input-group mb-2">
                                        <input
                                            type="number"
                                            value={produto.quant}
                                            min="1"
                                            className="form-control form-control-sm"
                                            onChange={(e) =>
                                                atualizarQuantidade(produto.id, parseInt(e.target.value))
                                            }
                                        />
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removerProduto(produto.id)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p className="text-muted">O carrinho está vazio.</p>
                    </div>
                )}
            </div>
            <div id="total" className="text-center mt-4">
                <h3>Total: R$ {total.toFixed(2)}</h3>
            </div>
        </div>
    );
}
