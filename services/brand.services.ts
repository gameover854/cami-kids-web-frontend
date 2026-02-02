import axios from "./axios";

export function getBrand() {
  return axios.get("/brands");
}
