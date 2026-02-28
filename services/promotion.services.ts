import axios from "./axios";

export function getPromotion() {
  return axios.get("/promotions");
}

export function getPromotionById(id: number) {
  return axios.get(`/promotions/${id}`);
}

export function createPromotion(payload: {
  code: string;
  name: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
}) {
  return axios.post("/promotions", payload);
}

export function updatePromotion(
  id: number,
  payload: {
    code?: string;
    name?: string;
    type?: "PERCENTAGE" | "FIXED_AMOUNT";
    value?: number;
    start_date?: string;
    end_date?: string;
    is_active?: boolean;
  },
) {
  return axios.put(`/promotions/${id}`, payload);
}

export function deletePromotion(id: number) {
  return axios.delete(`/promotions/${id}`);
}
