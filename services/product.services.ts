import axios from "./axios";

export function getAllProduct() {
    return axios.get("/products");
}
export function getProductById(id: number) {
    return axios.get("/products/");
}
export function createProduct(payload: PayloadProduct) {
    return axios.post("/products", payload);
}
export function updateProduct(id: number, payload: Product) {
    return axios.put("/products", payload);
}
export function deleteProduct(id: number) {
    return axios.put("/products");
}