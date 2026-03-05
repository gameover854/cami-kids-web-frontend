"use client";

import Header from "@/components/layout/header";
import ProductForm from "@/components/product/ProductForm";
import Loading from "@/components/notification/loading";
import useProductForm from "@/hooks/useProductForm";
import { getBrand } from "@/services/brand.services";
import { getCategory } from "@/services/category.services";
import { getCollection } from "@/services/collections.services";
import { getProductById, updateProduct } from "@/services/product.services";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ProductDetailCollectionItem = {
  collection_id: number;
};

type ProductDetailAttributeValue = {
  value: string;
};

type ProductDetailAttribute = {
  id: number;
  name: string;
  values: ProductDetailAttributeValue[];
};

type ProductDetailVariantAttribute = {
  value?: { value?: string };
};

type ProductDetailVariant = {
  id: number;
  price: number;
  stock_quantity: number;
  sku?: string;
  barcode?: string;
  attributes?: ProductDetailVariantAttribute[];
};

type ProductDetailImage = {
  id: number;
  url: string;
  public_id?: string;
  is_main?: boolean;
  order?: number;
};

type ProductDetailResponse = {
  id: number;
  name: string;
  selling_price: number;
  compare_price?: number;
  description?: string;
  category_id?: number | null;
  brand_id?: number | null;
  is_active: boolean;
  collections?: ProductDetailCollectionItem[];
  attributes?: ProductDetailAttribute[];
  variants?: ProductDetailVariant[];
  images?: ProductDetailImage[];
};

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const rawProductId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const productId = rawProductId ? Number(rawProductId) : Number.NaN;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState<Categories>([]);
  const [dataCollections, setDataCollections] = useState<Collections>([]);
  const [dataBrand, setDataBrand] = useState<Brands>([]);

  const {
    dataProduct,
    setDataProduct,
    dataAttribute,
    dataVariant,
    dataImage,
    setInitialFormData,
    handleAddAttribute,
    handleRemoveAttribute,
    handleAttributeName,
    handleAddAttributeItem,
    handleRemoveAttributeItem,
    handleVariantNumber,
    handleUploadImage,
    handleUpdateImage,
    handleCheckCollections,
    buildPayload,
  } = useProductForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!rawProductId) return;
      if (!Number.isInteger(productId) || productId <= 0) {
        router.push("/admin/product");
        return;
      }

      setIsLoading(true);
      try {
        const [productRes, categoryRes, collectionRes, brandRes] = await Promise.all([
          getProductById(productId),
          getCategory(),
          getCollection(),
          getBrand(),
        ]);

        const product = productRes.data.product as ProductDetailResponse;

        setDataCategories([{ id: null, name: "Tat ca" }, ...categoryRes.data.categories]);
        setDataCollections(collectionRes.data.collections);
        setDataBrand([{ id: null, name: "Tat ca" }, ...brandRes.data.brands]);

        const normalizedProduct: Product = {
          id: product.id,
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

        setInitialFormData({
          product: normalizedProduct,
          attributes: normalizedAttributes,
          variants: normalizedVariants,
          images: normalizedImages,
        });
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, rawProductId, router, setInitialFormData]);

  const submitUpdate = async () => {
    if (!Number.isInteger(productId) || productId <= 0) return;
    setIsLoading(true);
    try {
      await updateProduct(productId, buildPayload());
      router.push("/admin/product");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth dark:bg-background-dark-2">
        <ProductForm
          title="Chinh sua san pham"
          submitLabel="Luu thay doi"
          dataProduct={dataProduct}
          setDataProduct={setDataProduct}
          dataAttribute={dataAttribute}
          dataVariant={dataVariant}
          dataImage={dataImage}
          dataCategories={dataCategories}
          dataCollections={dataCollections}
          dataBrand={dataBrand}
          onAddAttribute={handleAddAttribute}
          onRemoveAttribute={handleRemoveAttribute}
          onAttributeName={handleAttributeName}
          onAddAttributeItem={handleAddAttributeItem}
          onRemoveAttributeItem={handleRemoveAttributeItem}
          onVariantNumber={handleVariantNumber}
          onUploadImage={handleUploadImage}
          onUpdateImage={handleUpdateImage}
          onCheckCollections={handleCheckCollections}
          onSubmit={submitUpdate}
        />
        {isLoading ? <Loading /> : null}
      </main>
    </div>
  );
}
