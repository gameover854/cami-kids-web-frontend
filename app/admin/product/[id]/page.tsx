"use client";

import Header from "@/components/layout/header";
import ProductForm from "@/components/product/ProductForm";
import Loading from "@/components/notification/loading";
import useProductForm from "@/hooks/useProductForm";
import { getBrand } from "@/services/brand.services";
import { getCategory } from "@/services/category.services";
import { getCollection } from "@/services/collections.services";
import { getProductById, updateProduct } from "@/services/product.services";
import { mapProductDetailToFormData } from "@/utils/product.mapper";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    handleVariantText,
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

        const product = productRes.data.product as ProductDetail;

        setDataCategories([{ id: null, name: "Tất cả" }, ...categoryRes.data.categories]);
        setDataCollections(collectionRes.data.collections);
        setDataBrand([{ id: null, name: "Tất cả" }, ...brandRes.data.brands]);

        setInitialFormData(mapProductDetailToFormData(product));
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
          title="Chỉnh sửa sản phẩm"
          submitLabel="Lưu thay đổi"
          productId={Number.isInteger(productId) ? productId : undefined}
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
          onVariantText={handleVariantText}
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
