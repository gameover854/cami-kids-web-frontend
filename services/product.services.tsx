import axios from "./axios";

export function createProduct(payload: any) {
    return axios.post("/products", payload);
}