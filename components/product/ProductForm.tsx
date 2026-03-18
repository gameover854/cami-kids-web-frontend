"use client";

import { Checkbox, Field, Label } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { formatVND } from "@/utils/formatCurrency";
import { sileo } from "sileo";

export default function ProductForm({
  title,
  submitLabel,
  productId,
  dataProduct,
  setDataProduct,
  dataAttribute,
  dataVariant,
  dataImage,
  dataCategories,
  dataCollections,
  dataBrand,
  onAddAttribute,
  onRemoveAttribute,
  onAttributeName,
  onAddAttributeItem,
  onRemoveAttributeItem,
  onVariantNumber,
  onVariantText,
  onUploadImage,
  onUpdateImage,
  onCheckCollections,
  onSubmit,
}: ProductFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const uploadToastId = useRef<string | null>(null);

  const canLinkVariant = (variantId?: number | string) =>
    Number.isInteger(productId) && Number.isInteger(variantId);

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    try {
      await onUploadImage(event);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (isUploading) {
      if (uploadToastId.current) {
        sileo.dismiss(uploadToastId.current);
      }
      uploadToastId.current = sileo.show({
        title: "Đang chờ",
        description: "Đang tải ảnh sản phẩm...",
        duration: null,
      });
      return;
    }
    if (uploadToastId.current) {
      sileo.dismiss(uploadToastId.current);
      uploadToastId.current = null;
    }
  }, [isUploading]);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-black dark:text-white text-text-gray-100">
          {title}
        </h1>
        <button
          className="cursor-pointer px-6 h-10 rounded-lg bg-background-primary text-background-dark text-sm font-bold"
          onClick={onSubmit}
        >
          {submitLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-6 space-y-5">
            <label className="flex flex-col gap-2 text-text-gray-100">
              <span className="text-base font-semibold">Tên sản phẩm</span>
              <input
                className="w-full rounded-lg text-base px-4 py-3 border border-border-gray dark:border-border-dark outline-none bg-background-light dark:bg-background-dark"
                placeholder="Nhập tên sản phẩm"
                value={dataProduct.name}
                onChange={(e) => setDataProduct((prev) => ({ ...prev, name: e.target.value }))}
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-text-gray-100">
                <span className="text-base font-semibold">Giá bán</span>
                <input
                  className="w-full rounded-lg text-base px-4 py-3 border border-border-gray dark:border-border-dark outline-none bg-background-light dark:bg-background-dark"
                  type="number"
                  placeholder="Nhập giá bán"
                  value={dataProduct.selling_price}
                  onChange={(e) =>
                    setDataProduct((prev) => ({
                      ...prev,
                      selling_price: Number(e.target.value),
                    }))
                  }
                />
                <span className="text-sm text-text-gray-100">
                  {formatVND(dataProduct.selling_price)} VNĐ
                </span>
                <span className="text-sm text-text-gray-100">Định dạng: 1.000.000 VNĐ</span>
              </label>
              <label className="flex flex-col gap-2 text-text-gray-100">
                <span className="text-base font-semibold">Giá so sánh</span>
                <input
                  className="w-full rounded-lg text-base px-4 py-3 border border-border-gray dark:border-border-dark outline-none bg-background-light dark:bg-background-dark"
                  type="number"
                  placeholder="Nhập giá so sánh"
                  value={dataProduct.compare_price || 0}
                  onChange={(e) =>
                    setDataProduct((prev) => ({
                      ...prev,
                      compare_price: Number(e.target.value),
                    }))
                  }
                />
                <span className="text-sm text-text-gray-100">
                  {formatVND(dataProduct.compare_price || 0)} VNĐ
                </span>
                <span className="text-sm text-text-gray-100">Định dạng: 1.000.000 VNĐ</span>
              </label>
            </div>
            <label className="flex flex-col gap-2 text-text-gray-100">
              <span className="text-base font-semibold">Mô tả sản phẩm</span>
              <textarea
                className="w-full rounded-lg text-base px-4 py-3 border border-border-gray dark:border-border-dark outline-none bg-background-light dark:bg-background-dark"
                rows={4}
                placeholder="Nhập mô tả sản phẩm"
                value={dataProduct.description}
                onChange={(e) =>
                  setDataProduct((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </label>
          </section>

          <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-gray-100">
                Thuộc tính và biến thể
              </h2>
              <button className="text-sm text-primary" onClick={onAddAttribute}>
                + Thêm thuộc tính
              </button>
            </div>
            <div className="space-y-3">
              {dataAttribute.map((attribute) => (
                <div
                  key={attribute.id}
                  className="border border-border-gray dark:border-border-dark rounded-lg p-4"
                >
                  <div className="flex gap-2">
                    <label className="flex-1 flex flex-col gap-2 text-text-gray-100">
                      <span className="text-base font-semibold">Tên thuộc tính</span>
                      <input
                        className="rounded text-base px-4 py-2.5 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
                        placeholder="Nhập tên thuộc tính"
                        value={attribute.name}
                        onChange={(e) => onAttributeName(attribute.id!, e.target.value)}
                      />
                    </label>
                    <button
                      className="text-sm text-red-400"
                      onClick={() => onRemoveAttribute(attribute.id!)}
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {attribute.values.map((value) => (
                      <button
                        key={value}
                        className="text-sm border border-border-dark rounded px-3 py-1.5 text-text-gray-100"
                        onClick={() => onRemoveAttributeItem(attribute.id!, value)}
                      >
                        {value} x
                      </button>
                    ))}
                    <label className="flex flex-col gap-2 text-text-gray-100">
                      <span className="text-base font-semibold">Giá trị thuộc tính</span>
                      <input
                        className="rounded text-base px-3 py-2 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
                        placeholder="Nhập rồi Enter"
                        onKeyDown={(e) => onAddAttributeItem(e, attribute.id!)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="text-left border-b border-border-gray dark:border-border-dark">
                    <th className="py-2">Tổ hợp</th>
                    <th className="py-2">SKU</th>
                    <th className="py-2">Giá</th>
                    <th className="py-2">Kho</th>
                  </tr>
                </thead>
                <tbody>
                  {dataVariant.map((variant) => (
                    <tr
                      key={variant.id}
                      className="border-b border-border-gray/60 dark:border-border-dark/50"
                    >
                      <td className="py-2">
                        {canLinkVariant(variant.id) ? (
                          <Link
                            className="text-primary hover:underline"
                            href={`/admin/product/${productId}/variant/${variant.id}`}
                          >
                            {variant.combo}
                          </Link>
                        ) : (
                          variant.combo
                        )}
                      </td>
                      <td className="py-2">
                        <input
                          className="rounded px-3 py-2 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
                          value={variant.sku || ""}
                          onChange={(e) => onVariantText(e.target.value, variant.id!, "sku")}
                        />
                      </td>
                      <td className="py-2">
                        <div className="flex flex-col gap-1">
                          <input
                            className="rounded px-3 py-2 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              onVariantNumber(Number(e.target.value), variant.id!, "price")
                            }
                          />
                          <span className="text-sm text-text-gray-100">
                            {formatVND(variant.price)} VNĐ
                          </span>
                          <span className="text-sm text-text-gray-100">
                            Định dạng: 1.000.000 VNĐ
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <input
                          className="rounded px-3 py-2 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
                          type="number"
                          value={variant.stock_quantity}
                          onChange={(e) =>
                            onVariantNumber(
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

          <section className="relative bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-6">
            <h2 className="text-lg font-semibold text-text-gray-100 mb-3">Hình ảnh</h2>
            <label className="flex flex-col gap-2 text-text-gray-100">
              <span className="text-base font-semibold">Tải ảnh sản phẩm</span>
              <div>
                <input
                  id="product-image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUploadImage}
                  className="sr-only"
                />
                <label
                  htmlFor="product-image-upload"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-2 text-sm font-semibold text-text-gray-100 hover:ring-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">upload</span>
                  Tải lên
                </label>
              </div>
            </label>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {dataImage.map((image) => (
                <div
                  key={image.id}
                  className="relative border border-border-gray dark:border-border-dark rounded-lg p-2 bg-white/70 dark:bg-background-dark"
                >
                  <Image
                    src={image.url}
                    alt="Product"
                    className="w-full h-24 object-contain rounded"
                    width={320}
                    height={96}
                    unoptimized
                  />
                  <div className="mt-2 flex gap-2 text-xs">
                    <button
                      onClick={() => onUpdateImage(image.id, ACTION_UPDATE_IMAGE.PRIMARY)}
                    >
                      Chọn chính
                    </button>
                    <button
                      className="text-red-400"
                      onClick={() => onUpdateImage(image.id, ACTION_UPDATE_IMAGE.DELETE)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-background-light dark:bg-background-dark rounded-xl border border-border-gray dark:border-border-dark p-6">
            <h2 className="text-lg font-semibold text-text-gray-100 mb-4">Tổ chức</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-text-gray-100">
                  Cho phép bán
                </span>
                <input
                  type="checkbox"
                  checked={dataProduct.is_active}
                  onChange={(e) =>
                    setDataProduct((prev) => ({ ...prev, is_active: e.target.checked }))
                  }
                />
              </div>

              <label className="flex flex-col gap-2 text-text-gray-100">
                <span className="text-base font-semibold">Thương hiệu</span>
                <select
                  className="w-full rounded-lg text-base px-4 py-3 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
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
              </label>

              <label className="flex flex-col gap-2 text-text-gray-100">
                <span className="text-base font-semibold">Danh mục</span>
                <select
                  className="w-full rounded-lg text-base px-4 py-3 border border-border-gray dark:border-border-dark bg-background-light dark:bg-background-dark"
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
              </label>

              <div className="max-h-50 overflow-y-auto">
                <p className="text-base font-semibold text-text-gray-100 mb-2">
                  Bộ sưu tập
                </p>
                {dataCollections.map((collection) => (
                  <Field key={collection.id} className="flex items-start">
                    <Checkbox
                      value={collection.id}
                      checked={(dataProduct.collection_id ?? []).includes(Number(collection.id))}
                      onChange={(checked) => onCheckCollections(checked, String(collection.id))}
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
                    <Label className="ml-2 text-base text-text-gray-100">
                      {collection.name}
                    </Label>
                  </Field>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
