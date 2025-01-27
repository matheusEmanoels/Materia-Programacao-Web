import { IProductCard } from "@/commons/interfaces";

export function ProductCard({
    id,
    imageUrl,
    name,
    description,
    price,
    onAddToCart,
  }: IProductCard) {
    return (
        <div className="col-md-3  mb-4">
            <div className="card">
                <img src={imageUrl} className="card-img-top"  alt={name}/>
                <div className="card-body">
                    <h5 className="card-title">
                        {name}
                    </h5>
                    <p className="card-text">R$ {price}</p>
                    <button
                    className="btn btn-primary w-100"
                    onClick={onAddToCart}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}
