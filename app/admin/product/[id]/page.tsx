"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import { getBrand } from "@/services/brand.services";
import { getCategory } from "@/services/category.services";
import { getCollection } from "@/services/collections.services";
import { getProductById, updateProduct } from "@/services/product.services";
import { uploadMutiple } from "@/services/upload.services";
import { convertToBase64, validateImage } from "@/utils/validateImage";
import { Checkbox, Field, Label } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
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

export default function EditProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const router = useRouter();
  const skipNextRegenerate = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState<Categories>([]);
  const [dataCollections, setDataCollections] = useState<Collections>([]);
  const [dataBrand, setDataBrand] = useState<Brands>([]);

  const [dataProduct, setDataProduct] = useState<Product>({
    name: "",
    selling_price: 0,
    compare_price: 0,
    description: "",
    category_id: null,
    collection_id: [],
    brand_id: null,
    is_active: false,
  });
  const [dataAttribute, setDataAttribute] = useState<ProductAttribute>([]);
  const [dataVariant, setDataVariant] = useState<ProductVariant>([]);
  const [dataImage, setDataImage] = useState<ProductImage>([]);

  const generateVariants = (attributes: ProductAttribute) => {
    const variants: ProductVariant = [];
    const attributeValues = attributes
      .filter((item) => item.values.length > 0)
      .map((item) => item.values);

    if (attributeValues.length === 0) return variants;

    const combo = attributeValues.reduce(
      (before, after) =>
        before.flatMap((left) =>
          after.map((right) => (left ? `${left} / ${right}` : right)),
        ),
      [""],
    );

    for (const item of combo) {
      variants.push({
        id: uuidv4(),
        price: 0,
        stock_quantity: 0,
        combo: item,
      });
    }

    return variants;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!Number.isInteger(productId)) {
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

        setDataCategories([
          { id: null, name: "Tất cả" },
          ...categoryRes.data.categories,
        ]);
        setDataCollections(collectionRes.data.collections);
        setDataBrand([{ id: null, name: "Tất cả" }, ...brandRes.data.brands]);

        setDataProduct({
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
        });

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

        skipNextRegenerate.current = true;
        setDataAttribute(normalizedAttributes);
        setDataVariant(normalizedVariants);
        setDataImage(normalizedImages);
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, router]);

  useEffect(() => {
    if (skipNextRegenerate.current) {
      skipNextRegenerate.current = false;
      return;
    }
    setDataVariant(generateVariants(dataAttribute));
  }, [dataAttribute]);

  const handleAddAttribute = () => {
    setDataAttribute((prev) => [...prev, { id: uuidv4(), name: "", values: [] }]);
  };

  const handleRemoveAttribute = (attributeId: string | number) => {
    setDataAttribute((prev) => prev.filter((item) => item.id !== attributeId));
  };

  const handleAttributeName = (attributeId: string | number, attributeName: string) => {
    setDataAttribute((prev) =>
      prev.map((item) =>
        item.id === attributeId ? { ...item, name: attributeName } : item,
      ),
    );
  };

  const handleAddAttributeItem = (
    event: React.KeyboardEvent<HTMLInputElement>,
    attributeItemId: string | number,
  ) => {
    if (event.key !== "Enter") return;
    const value = String(event.currentTarget.value).trim();
    if (!value) return;

    setDataAttribute((prev) =>
      prev.map((item) =>
        item.id === attributeItemId && !item.values.includes(value)
          ? { ...item, values: [...item.values, value] }
          : item,
      ),
    );
    event.currentTarget.value = "";
  };

  const handleRemoveAttributeItem = (
    attributeItemId: string | number,
    attributeItemValue: string,
  ) => {
    setDataAttribute((prev) =>
      prev.map((item) =>
        item.id === attributeItemId
          ? {
              ...item,
              values: item.values.filter((value) => value !== attributeItemValue),
            }
          : item,
      ),
    );
  };

  const handleVariantNumber = (
    value: number,
    variantItemId: string | number,
    type: "price" | "stock_quantity",
  ) => {
    setDataVariant((prev) =>
      prev.map((item) =>
        item.id === variantItemId ? { ...item, [type]: value } : item,
      ),
    );
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const validFiles = Array.from(fileList).filter((file) =>
      validateImage(file.size, file.type),
    );
    if (validFiles.length === 0) return;

    try {
      const base64Files = await Promise.all(
        validFiles.map((file) => convertToBase64(file)),
      );
      const { data } = await uploadMutiple(base64Files as string[]);
      const newImages = data.map((image: Image) => ({
        id: uuidv4(),
        url: image.url,
        public_id: image.public_id,
        is_main: false,
      }));
      setDataImage((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      e.target.value = "";
    }
  };

  const handleUpdateImage = (imageId: string | number, action: ACTION_UPDATE_IMAGE) => {
    if (action === ACTION_UPDATE_IMAGE.PRIMARY) {
      setDataImage((images) =>
        images.map((image) =>
          image.id === imageId
            ? { ...image, is_main: true }
            : { ...image, is_main: false },
        ),
      );
      return;
    }
    setDataImage((images) => images.filter((image) => image.id !== imageId));
  };

  const handleCheckCollections = (checked: boolean, collectionId: string) => {
    const id = Number(collectionId);
    setDataProduct((prev) => {
      const collectionIds = prev.collection_id ?? [];
      return {
        ...prev,
        collection_id: checked
          ? [...collectionIds, id]
          : collectionIds.filter((item) => item !== id),
      };
    });
  };

  const parseData = (): PayloadProduct => ({
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

  const submitUpdate = async () => {
    if (!Number.isInteger(productId)) return;
    setIsLoading(true);
    try {
      await updateProduct(productId, parseData());
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
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black dark:text-white text-text-gray-100">
              Chỉnh sửa sản phẩm
            </h1>
            <button
              className="cursor-pointer px-6 h-10 rounded-lg bg-background-primary text-background-dark text-sm font-bold"
              onClick={submitUpdate}
            >
              Lưu thay đổi
            </button>
          </div>

          <section className="bg-background-dark rounded-xl border border-border-dark p-5 space-y-4">
            <input
              className="w-full rounded-lg text-sm px-3 py-2.5 border border-border-dark outline-none dark:bg-background-dark"
              placeholder="Tên sản phẩm"
              value={dataProduct.name}
              onChange={(e) => setDataProduct((prev) => ({ ...prev, name: e.target.value }))}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full rounded-lg text-sm px-3 py-2.5 border border-border-dark outline-none dark:bg-background-dark"
                type="number"
                placeholder="Giá bán"
                value={dataProduct.selling_price}
                onChange={(e) =>
                  setDataProduct((prev) => ({
                    ...prev,
                    selling_price: Number(e.target.value),
                  }))
                }
              />
              <input
                className="w-full rounded-lg text-sm px-3 py-2.5 border border-border-dark outline-none dark:bg-background-dark"
                type="number"
                placeholder="Giá so sánh"
                value={dataProduct.compare_price || 0}
                onChange={(e) =>
                  setDataProduct((prev) => ({
                    ...prev,
                    compare_price: Number(e.target.value),
                  }))
                }
              />
            </div>
            <textarea
              className="w-full rounded-lg text-sm px-3 py-2.5 border border-border-dark outline-none dark:bg-background-dark"
              rows={4}
              placeholder="Mô tả sản phẩm"
              value={dataProduct.description}
              onChange={(e) =>
                setDataProduct((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </section>

          <section className="bg-background-dark rounded-xl border border-border-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text-gray-100">Thuộc tính & Biến thể</h2>
              <button className="text-sm text-primary" onClick={handleAddAttribute}>
                + Thêm thuộc tính
              </button>
            </div>
            <div className="space-y-3">
              {dataAttribute.map((attribute) => (
                <div key={attribute.id} className="border border-border-dark rounded-lg p-3">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded text-sm px-3 py-2 border border-border-dark bg-background-dark"
                      placeholder="Tên thuộc tính"
                      value={attribute.name}
                      onChange={(e) => handleAttributeName(attribute.id!, e.target.value)}
                    />
                    <button
                      className="text-sm text-red-400"
                      onClick={() => handleRemoveAttribute(attribute.id!)}
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {attribute.values.map((value) => (
                      <button
                        key={value}
                        className="text-xs border border-border-dark rounded px-2 py-1 text-text-gray-100"
                        onClick={() => handleRemoveAttributeItem(attribute.id!, value)}
                      >
                        {value} x
                      </button>
                    ))}
                    <input
                      className="rounded text-sm px-2 py-1 border border-border-dark bg-background-dark"
                      placeholder="Nhập rồi Enter"
                      onKeyDown={(e) => handleAddAttributeItem(e, attribute.id!)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border-dark">
                    <th className="py-2">Tổ hợp</th>
                    <th className="py-2">Giá</th>
                    <th className="py-2">Kho</th>
                  </tr>
                </thead>
                <tbody>
                  {dataVariant.map((variant) => (
                    <tr key={variant.id} className="border-b border-border-dark/50">
                      <td className="py-2">{variant.combo}</td>
                      <td className="py-2">
                        <input
                          className="rounded px-2 py-1 border border-border-dark bg-background-dark"
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantNumber(Number(e.target.value), variant.id!, "price")
                          }
                        />
                      </td>
                      <td className="py-2">
                        <input
                          className="rounded px-2 py-1 border border-border-dark bg-background-dark"
                          type="number"
                          value={variant.stock_quantity}
                          onChange={(e) =>
                            handleVariantNumber(
                              Number(e.target.value),
                              variant.id!,
                              "stock_quantity",
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-background-dark rounded-xl border border-border-dark p-5">
            <h2 className="font-bold text-text-gray-100 mb-3">Hình ảnh</h2>
            <input type="file" accept="image/*" multiple onChange={handleUploadImage} />
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {dataImage.map((image) => (
                <div key={image.id} className="relative border border-border-dark rounded-lg p-2">
                  <img src={image.url} alt="Product" className="w-full h-24 object-cover rounded" />
                  <div className="mt-2 flex gap-2 text-xs">
                    <button onClick={() => handleUpdateImage(image.id, ACTION_UPDATE_IMAGE.PRIMARY)}>
                      Chọn chính
                    </button>
                    <button
                      className="text-red-400"
                      onClick={() => handleUpdateImage(image.id, ACTION_UPDATE_IMAGE.DELETE)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-background-dark rounded-xl border border-border-dark p-5">
            <h2 className="font-bold text-text-gray-100 mb-3">Tổ chức</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-gray-100">Cho phép bán</span>
                <input
                  type="checkbox"
                  checked={dataProduct.is_active}
                  onChange={(e) =>
                    setDataProduct((prev) => ({ ...prev, is_active: e.target.checked }))
                  }
                />
              </div>

              <select
                className="w-full rounded-lg text-sm px-3 py-2.5 border border-border-dark bg-background-dark"
                value={dataProduct.brand_id ?? ""}
                onChange={(e) =>
                  setDataProduct((prev) => ({
                    ...prev,
                    brand_id: e.target.value ? Number(e.target.value) : null,
                  }))
                }
              >
                {dataBrand.map((brand) => (
                  <option key={brand.id ?? "all-brand"} value={brand.id ?? ""}>
                    {brand.name}
                  </option>
                ))}
              </select>

              <select
                className="w-full rounded-lg text-sm px-3 py-2.5 border border-border-dark bg-background-dark"
                value={dataProduct.category_id ?? ""}
                onChange={(e) =>
                  setDataProduct((prev) => ({
                    ...prev,
                    category_id: e.target.value ? Number(e.target.value) : null,
                  }))
                }
              >
                {dataCategories.map((parent) => (
                  <Fragment key={parent.id}>
                    <option value={parent.id ?? ""}>{parent.name}</option>
                    {parent.children?.map((child) => (
                      <option key={child.id} value={child.id ?? ""}>
                        └─ {child.name}
                      </option>
                    ))}
                  </Fragment>
                ))}
              </select>

              <div className="max-h-50 overflow-y-auto">
                {dataCollections.map((collection) => (
                  <Field key={collection.id} className="flex items-start">
                    <Checkbox
                      value={collection.id}
                      checked={(dataProduct.collection_id ?? []).includes(
                        Number(collection.id),
                      )}
                      onChange={(checked) =>
                        handleCheckCollections(checked, String(collection.id))
                      }
                      className="group block size-4 rounded border bg-white data-checked:bg-blue-500 mb-3"
                    >
                      <svg
                        className="stroke-white opacity-0 group-data-checked:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Checkbox>
                    <Label className="ml-2 text-sm text-text-gray-100">{collection.name}</Label>
                  </Field>
                ))}
              </div>
            </div>
          </section>
        </div>
        {isLoading && <Loading />}
      </main>
    </div>
  );
}
