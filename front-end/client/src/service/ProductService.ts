import { api } from "@/lib/axios";
import { IProduct } from "src/commons/interfaces";

const PRODUCT_URL = "/product";

const findAll = async(): Promise<any> =>{
    let response;
    try{
        response = await api.get(`${PRODUCT_URL}`);
    }catch(error : any){
        response = error.response;
    }
    return response;
};

const remove = async(id: number): Promise<any> =>{
    let response;
    try{
        response = await api.delete(`${PRODUCT_URL}/${id}`);
    }catch(error : any){
        response = error.response;
    }
    return response;
};

const save = async(product : IProduct): Promise<any>=>{
    let response;
    try {
        response = await api.post(`${PRODUCT_URL}`,product);
    } catch (error : any) {
        response = error.response;
    }
    return response;
};

const findById = async (id : Number): Promise<any>=>{
    let response;
    try {
        response = await api.get(`${PRODUCT_URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
};

const ProductService = {
    findAll,
    remove,
    save,
    findById,
};

export default ProductService;