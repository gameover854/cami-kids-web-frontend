import { v4 as uuidv4 } from "uuid";

export const mapProductDetailToFormData = (
  product: ProductDetail,
): ProductFormInitialData => {
  const normalizedProduct: UpsertProduct = {
    name: product.name || "",
    selling_price: Number(product.selling_price || 0),
    compare_price: Number(product.compare_price || 0),
    description: product.description || "",
    category_id: product.category_id ?? null,
    brand_id: product.brand_id ?? null,
    collection_id: Array.isArray(product.collections)
      ? product.collections.map((item) => Number(item.collection_id))
      : [],
    is_active: Boolean(product.is_active),
  };

  const normalizedAttributes: ProductAttribute = Array.isArray(product.attributes)
    ? product.attributes.map((attr) => ({
        id: attr.id ?? uuidv4(),
        name: attr.name || "",
        values: Array.isArray(attr.values)
          ? attr.values.map((value) => String(value.value || ""))
          : [],
      }))
    : [];

  const normalizedVariants: ProductVariant = Array.isArray(product.variants)
    ? product.variants.map((variant) => ({
        id: variant.id,
        price: Number(variant.price || 0),
        stock_quantity: Number(variant.stock_quantity || 0),
        combo: Array.isArray(variant.attributes)
          ? variant.attributes
              .map((item) => String(item.value?.value || "").trim())
              .filter(Boolean)
              .join(" / ")
          : "",
        sku: variant.sku || "",
        barcode: variant.barcode || "",
      }))
    : [];

  const normalizedImages: ProductImage = Array.isArray(product.images)
    ? product.images.map((image, index) => ({
        id: image.id ?? uuidv4(),
        url: image.url,
        public_id: image.public_id || "",
        is_main: Boolean(image.is_main),
        order: Number.isInteger(image.order) ? image.order : index,
      }))
    : [];

  return {
    product: normalizedProduct,
    attributes: normalizedAttributes,
    variants: normalizedVariants,
    images: normalizedImages,
  };
};

export const mapProductFormToPayload = (
  dataProduct: UpsertProduct,
  dataAttribute: ProductAttribute,
  dataVariant: ProductVariant,
  dataImage: ProductImage,
): UpsertProductPayload => ({
  product: {
    name: dataProduct.name,
    selling_price: Number(dataProduct.selling_price || 0),
    compare_price: Number(dataProduct.compare_price || 0),
    description: dataProduct.description,
    category_id: dataProduct.category_id ?? null,
    brand_id: dataProduct.brand_id ?? null,
    collection_id: dataProduct.collection_id ?? [],
    is_active: Boolean(dataProduct.is_active),
  },
  attributes: dataAttribute.filter((item) => item.name && item.values.length > 0),
  variants: dataVariant,
  images: dataImage,
});
