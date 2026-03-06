export const ORDER_STATUSES = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
] as const;

export const ORDER_STATUS_TRANSITIONS: Record<
  (typeof ORDER_STATUSES)[number],
  (typeof ORDER_STATUSES)[number][]
> = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["COMPLETED", "CANCELLED"],
  COMPLETED: ["CANCELLED"],
  CANCELLED: [],
};

export const PAYMENT_METHODS = [
  "COD",
  "BANK_TRANSFER",
  "MOMO",
  "VNPAY",
  "CREDIT_CARD",
] as const;

export const PAYMENT_STATUSES = ["PENDING", "SUCCESS", "FAILED", "REFUNDED"] as const;
