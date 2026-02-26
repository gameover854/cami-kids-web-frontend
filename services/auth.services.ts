import axios from "./axios";

export function login(payload: { email: string; password: string }) {
  return axios.post("/auth/login", payload);
}

export function me() {
  return axios.get("/auth/me");
}
