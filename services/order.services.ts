import axios from "./axios";
import { ORDER_STATUSES, PAYMENT_METHODS, PAYMENT_STATUSES } from "@/constants/order";

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

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
    method?: PaymentMethod;
    status?: PaymentStatus;
    transaction_id?: string | null;
  },
) {
  return axios.put(`/orders/${id}/payment`, payload);
}

export function createOrder(payload: {
  items: Array<{ variant_id: number; quantity: number }>;
  shipping_address: string;
  user_id?: number | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  payment?: {
    amount?: number;
    method?: PaymentMethod;
    status?: PaymentStatus;
    transaction_id?: string | null;
  };
}) {
  return axios.post("/orders", payload);
}
