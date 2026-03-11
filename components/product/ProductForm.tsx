"use client";

import { Checkbox, Field, Label } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

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
  const canLinkVariant = (variantId?: number | string) =>
    Number.isInteger(productId) && Number.isInteger(variantId);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black dark:text-white text-text-gray-100">{title}</h1>
        <button
          className="cursor-pointer px-6 h-10 rounded-lg bg-background-primary text-background-dark text-sm font-bold"
          onClick={onSubmit}
        >
          {submitLabel}
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
          <h2 className="font-bold text-text-gray-100">Thuộc tính và Biến thể</h2>
          <button className="text-sm text-primary" onClick={onAddAttribute}>
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
                  onChange={(e) => onAttributeName(attribute.id!, e.target.value)}
                />
                <button
                  className="text-sm text-red-400"
                  onClick={() => onRemoveAttribute(attribute.id!)}
                >
                  Xóa
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {attribute.values.map((value) => (
                  <button
                    key={value}
                    className="text-xs border border-border-dark rounded px-2 py-1 text-text-gray-100"
                    onClick={() => onRemoveAttributeItem(attribute.id!, value)}
                  >
                    {value} x
                  </button>
                ))}
                <input
                  className="rounded text-sm px-2 py-1 border border-border-dark bg-background-dark"
                  placeholder="Nhập rồi Enter"
                  onKeyDown={(e) => onAddAttributeItem(e, attribute.id!)}
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
                <th className="py-2">SKU</th>
                <th className="py-2">Giá</th>
                <th className="py-2">Kho</th>
              </tr>
            </thead>
            <tbody>
              {dataVariant.map((variant) => (
                <tr key={variant.id} className="border-b border-border-dark/50">
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
                      className="rounded px-2 py-1 border border-border-dark bg-background-dark"
                      value={variant.sku || ""}
                      onChange={(e) =>
                        onVariantText(e.target.value, variant.id!, "sku")
                      }
                    />
                  </td>
                  <td className="py-2">
                    <input
                      className="rounded px-2 py-1 border border-border-dark bg-background-dark"
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        onVariantNumber(Number(e.target.value), variant.id!, "price")
                      }
                    />
                  </td>
                  <td className="py-2">
                    <input
                      className="rounded px-2 py-1 border border-border-dark bg-background-dark"
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

      <section className="bg-background-dark rounded-xl border border-border-dark p-5">
        <h2 className="font-bold text-text-gray-100 mb-3">Hình ảnh</h2>
        <input type="file" accept="image/*" multiple onChange={onUploadImage} />
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dataImage.map((image) => (
            <div key={image.id} className="relative border border-border-dark rounded-lg p-2">
              <Image
                src={image.url}
                alt="Product"
                className="w-full h-24 object-cover rounded"
                width={320}
                height={96}
                unoptimized
              />
              <div className="mt-2 flex gap-2 text-xs">
                <button onClick={() => onUpdateImage(image.id, ACTION_UPDATE_IMAGE.PRIMARY)}>
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
                <Label className="ml-2 text-sm text-text-gray-100">{collection.name}</Label>
              </Field>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
