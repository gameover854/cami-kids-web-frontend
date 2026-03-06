import axios from "./axios";

export function getDashboardSummary() {
  return axios.get<{ summary: AdminDashboardSummary }>("/dashboard/summary");
}
