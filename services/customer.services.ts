import axios from "./axios";

export function getCustomer(page = 1, limit = 10, keyword = "") {
  return axios.get("/customers", {
    params: {
      page,
      limit,
      keyword,
    },
  });
}

export function getCustomerById(id: number) {
  return axios.get(`/customers/${id}`);
}

export function createCustomer(payload: {
  name?: string;
  email: string;
  phone?: string;
  password?: string;
}) {
  return axios.post("/customers", payload);
}

export function updateCustomer(
  id: number,
  payload: {
    name?: string;
    phone?: string | null;
  },
) {
  return axios.put(`/customers/${id}`, payload);
}

export function deleteCustomer(id: number) {
  return axios.delete(`/customers/${id}`);
}
