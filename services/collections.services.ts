import axios from "./axios";

export function getCollection() {
  return axios.get("/collections");
}
