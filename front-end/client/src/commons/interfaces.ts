export interface IUserSignup{
    displayName: string;
    username: string;
    password: string;
}

export interface IUserLogin{
    username: string;
    password: string;
}

export interface ApiResponse {
    message: string;
    validationErrors: any; 
}

export interface ICategory{
    id?: number;
    name: string;
}

export interface IProduct{
    id?: number,
    name: string,
    price: number,
    description: string,
    category: ICategory;
}

export interface IProductCard {
    id?: number;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    onAddToCart: () => void;
}

export interface IProductOrder {
    id?: number;
    quantity: number; 
    unitPrice: number; 
    product: IProduct;
}

export interface IOrder{
    id?: number;
    price: number;
    date: string;
    userId: number;
    productOrders: IProductOrder[];
}
  