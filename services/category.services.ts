import axios from "./axios";

export function getCategory() {
  return axios.get("/categories");
}

export function getCategoryById(id: number) {
  return axios.get(`/categories/${id}`);
}

export function createCategory(payload: {
  name: string;
  parent_id?: number | null;
  brand_id?: number | null;
}) {
  return axios.post("/categories", payload);
}

export function updateCategory(
  id: number,
  payload: { name?: string; parent_id?: number | null; brand_id?: number | null },
) {
  return axios.put(`/categories/${id}`, payload);
}

export function deleteCategory(id: number) {
  return axios.delete(`/categories/${id}`);
}
