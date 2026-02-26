import axios from "./axios";

export function getProduct(page: number, limit: number, filters: Filters) {
  return axios.get<GetProductResponse>("/products", {
    params: {
      page,
      limit,
      filters,
    },
  });
}
export function getProductById(id: number) {
  return axios.get(`/products/${id}`);
}
export function createProduct(payload: PayloadProduct) {
  return axios.post("/products", payload);
}
export function updateProduct(id: number, payload: Product) {
  return axios.put(`/products/${id}`, payload);
}
export function deleteProduct(id: number) {
  return axios.delete(`/products/${id}`);
}
