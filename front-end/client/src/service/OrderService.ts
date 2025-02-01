import { api } from "@/lib/axios";
import { IOrder } from "src/commons/interfaces";

const ORDER_SERVICE = "/order";

const findAll = async(): Promise<any> =>{
    let response;
    try{
        response = await api.get(`${ORDER_SERVICE}`);
    }catch(error : any){
        response = error.response;
    }
    return response;
}

const remove = async(id: number): Promise<any> =>{
    let response;
    try{
        response = await api.delete(`${ORDER_SERVICE}/${id}`);
    }catch(error : any){
        response = error.response;
    }
    return response;
}

const save = async(order : IOrder): Promise<any>=>{
    let response;

    try {
        response = await api.post(`${ORDER_SERVICE}`,order);
    } catch (error : any) {
        response = error.response;
    }
    return response;
}

const findById = async (id : Number): Promise<any>=>{
    let response;
    try {
        response = await api.get(`${ORDER_SERVICE}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const OrderService = {
    findAll,
    remove,
    save,
    findById,
}

export default OrderService;