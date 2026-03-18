"use client";

import Header from "@/components/layout/header";
import ProductForm from "@/components/product/ProductForm";
import useProductForm from "@/hooks/useProductForm";
import { getBrand } from "@/services/brand.services";
import { getCategory } from "@/services/category.services";
import { getCollection } from "@/services/collections.services";
import { createProduct } from "@/services/product.services";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sileo } from "sileo";

export default function CreateProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState<Categories>([]);
  const [dataCollections, setDataCollections] = useState<Collections>([]);
  const [dataBrand, setDataBrand] = useState<Brands>([]);
  const loadingToastId = useRef<string | null>(null);

  const {
    dataProduct,
    setDataProduct,
    dataAttribute,
    dataVariant,
    dataImage,
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
      setIsLoading(true);
      try {
        const [categoryRes, collectionRes, brandRes] = await Promise.all([
          getCategory(),
          getCollection(),
          getBrand(),
        ]);

        setDataCategories([{ id: null, name: "Tất cả" }, ...categoryRes.data.categories]);
        setDataCollections(collectionRes.data.collections);
        setDataBrand([{ id: null, name: "Tất cả" }, ...brandRes.data.brands]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) {
      if (loadingToastId.current) {
        sileo.dismiss(loadingToastId.current);
      }
      loadingToastId.current = sileo.show({
        title: "Đang chờ",
        description: "Đang xử lý dữ liệu sản phẩm...",
        duration: null,
      });
      return;
    }
    if (loadingToastId.current) {
      sileo.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [isLoading]);

  const submitCreate = async () => {
    try {
      setIsLoading(true);
      await createProduct(buildPayload());
      router.push("/admin/product");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth dark:bg-background-dark-2">
        <ProductForm
          title="Thêm sản phẩm"
          submitLabel="Lưu sản phẩm"
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
          onSubmit={submitCreate}
        />
      </main>
    </div>
  );
}
