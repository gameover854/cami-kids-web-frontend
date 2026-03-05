import axios from "./axios";

export function getVariantById(productId: number, variantId: number) {
  return axios.get(`/products/${productId}/variants/${variantId}`);
}

export function updateVariant(
  productId: number,
  variantId: number,
  payload: {
    sku?: string;
    barcode?: string;
    price?: number;
    stock_quantity?: number;
  },
) {
  return axios.put(`/products/${productId}/variants/${variantId}`, payload);
}
