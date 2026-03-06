import axios from "./axios";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export function getOrders(params?: {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  user_id?: number;
  sort?: "asc" | "desc";
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const filters: Record<string, string> = {};

  if (params?.status) filters.status = params.status;
  if (params?.user_id) filters.user_id = String(params.user_id);
  if (params?.sort) filters.sort = params.sort;

  return axios.get("/orders", {
    params: {
      page,
      limit,
      filters,
    },
  });
}

export function getOrderById(id: number) {
  return axios.get(`/orders/${id}`);
}

export function updateOrderStatus(id: number, status: OrderStatus) {
  return axios.put(`/orders/${id}/status`, { status });
}

export function updateOrderPayment(
  id: number,
  payload: {
    amount?: number;
    method?: string;
    status?: string;
    transaction_id?: string | null;
  },
) {
  return axios.put(`/orders/${id}/payment`, payload);
}
