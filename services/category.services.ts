import axios from "./axios";

export function getCategory() {
  return axios.get("/categories");
}
