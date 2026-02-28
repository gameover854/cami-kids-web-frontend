import axios from "./axios";

export function getCollection() {
  return axios.get("/collections");
}

export function getCollectionById(id: number) {
  return axios.get(`/collections/${id}`);
}

export function createCollection(payload: {
  name: string;
  slug: string;
  is_active?: boolean;
}) {
  return axios.post("/collections", payload);
}

export function updateCollection(
  id: number,
  payload: { name?: string; slug?: string; is_active?: boolean },
) {
  return axios.put(`/collections/${id}`, payload);
}

export function deleteCollection(id: number) {
  return axios.delete(`/collections/${id}`);
}
