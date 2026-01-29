import axios from "./axios";

export function getPromotion() {
  return axios.get("/promotions");
}
