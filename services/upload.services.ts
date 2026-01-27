import axios from "./axios";

export function uploadMutiple(files: Base64URLString[]) {
  return axios.post("/upload/multiple", {
    files: files,
  });
}
