import axios from "./axios";

export function getSetting() {
  return axios.get("/settings");
}

export function updateSetting(payload: {
  store_name?: string;
  support_email?: string;
  support_phone?: string;
  timezone?: string;
  auto_cancel_hours?: number;
  low_stock_threshold?: number;
  allow_guest_checkout?: boolean;
}) {
  return axios.put("/settings", payload);
}
