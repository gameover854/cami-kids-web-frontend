import axios from "./axios";

export function getBrand() {
  return axios.get("/brands");
}

export function getBrandById(id: number) {
  return axios.get(`/brands/${id}`);
}

export function createBrand(payload: {
  name: string;
  slug?: string;
  logo?: string;
  description?: string;
  is_active?: boolean;
}) {
  return axios.post("/brands", payload);
}

export function updateBrand(
  id: number,
  payload: {
    name?: string;
    slug?: string;
    logo?: string;
    description?: string;
    is_active?: boolean;
  },
) {
  return axios.put(`/brands/${id}`, payload);
}

export function deleteBrand(id: number) {
  return axios.delete(`/brands/${id}`);
}
