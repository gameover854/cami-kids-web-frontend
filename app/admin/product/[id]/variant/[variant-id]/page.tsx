"use client";

import Header from "@/components/layout/header";
import { getVariantById, updateVariant } from "@/services/variant.services";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { sileo } from "sileo";

export default function ProductVariantDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string; "variant-id": string }>();
  const rawProductId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const rawVariantId = Array.isArray(params?.["variant-id"])
    ? params["variant-id"][0]
    : params?.["variant-id"];
  const productId = rawProductId ? Number(rawProductId) : Number.NaN;
  const variantId = rawVariantId ? Number(rawVariantId) : Number.NaN;

  const [detail, setDetail] = useState<AdminVariantDetail | null>(null);
  const [form, setForm] = useState({
    sku: "",
    barcode: "",
    price: 0,
    stock_quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loadingToastId = useRef<string | null>(null);

  const loadVariant = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getVariantById(productId, variantId);
      const variant = res?.data?.variant;
      setDetail(variant || null);
      setForm({
        sku: variant?.sku || "",
        barcode: variant?.barcode || "",
        price: variant?.price || 0,
        stock_quantity: variant?.stock_quantity || 0,
      });
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Không thể tải chi tiết biến thể");
    } finally {
      setLoading(false);
    }
  }, [productId, variantId]);

  useEffect(() => {
    if (!rawProductId || !rawVariantId) return;
    if (Number.isNaN(productId) || Number.isNaN(variantId)) return;
    loadVariant();
  }, [loadVariant, productId, rawProductId, rawVariantId, variantId]);

  useEffect(() => {
    if (loading) {
      if (loadingToastId.current) {
        sileo.dismiss(loadingToastId.current);
      }
      loadingToastId.current = sileo.show({
        title: "Đang chờ",
        description: "Đang xử lý biến thể...",
        duration: null,
      });
      return;
    }
    if (loadingToastId.current) {
      sileo.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [loading]);

  async function saveVariant() {
    setMessage("");
    setError("");
    try {
      setLoading(true);
      await updateVariant(productId, variantId, {
        sku: form.sku.trim(),
        barcode: form.barcode.trim(),
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity),
      });
      setMessage("Cập nhật biến thể thành công");
      await loadVariant();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Cập nhật biến thể thất bại");
    } finally {
      setLoading(false);
    }
  }

  async function onSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveVariant();
  }

  const attributeText = (detail?.attributes || [])
    .map((item) => {
      const name = item.value?.attribute?.name || "Attribute";
      const value = item.value?.value || "";
      return `${name}: ${value}`;
    })
    .join(" | ");

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
              Chi tiết Biến thể
            </h1>
            <p className="text-text-gray-100 text-base mt-1">
              Sản phẩm #{productId} / Biến thể #{variantId}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <section className="lg:col-span-2 rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
              <h2 className="font-bold text-lg mb-3 dark:text-text-light text-text-gray-200">
                Tồn kho + Giá
              </h2>
              <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-sm text-text-gray-100">
                  SKU
                  <input
                    className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm text-text-gray-200 outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Nhập SKU"
                    value={form.sku}
                    onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-text-gray-100">
                  Barcode
                  <input
                    className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm text-text-gray-200 outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Nhập barcode"
                    value={form.barcode}
                    onChange={(e) => setForm((prev) => ({ ...prev, barcode: e.target.value }))}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-text-gray-100">
                  Giá bán
                  <input
                    className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm text-text-gray-200 outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Nhập giá"
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, price: Number(e.target.value) }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-text-gray-100">
                  Tồn kho
                  <input
                    className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm text-text-gray-200 outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Nhập tồn kho"
                    type="number"
                    min={0}
                    value={form.stock_quantity}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        stock_quantity: Number(e.target.value),
                      }))
                    }
                  />
                </label>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1"
                    disabled={loading}
                  >
                    Lưu biến thể
                  </button>
                </div>
              </form>
              {message ? <p className="mt-3 text-sm text-emerald-400">{message}</p> : null}
              {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
            </section>

            <aside className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
              <h2 className="font-bold text-lg mb-3 dark:text-text-light text-text-gray-200">
                Hành động
              </h2>
              <div className="flex gap-2 flex-wrap mb-4">
                <button
                  type="button"
                  className="rounded border border-border-gray px-3 py-1 hover:ring-1"
                  onClick={() => router.back()}
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  className="rounded border border-border-gray px-3 py-1 hover:ring-1"
                  onClick={() => setMessage("Luồng lưu trữ sẽ được bổ sung ở giai đoạn sau")}
                >
                  Lưu trữ
                </button>
                <button
                  type="button"
                  className="rounded bg-primary text-background-dark px-3 py-1 hover:opacity-90"
                  onClick={saveVariant}
                  disabled={loading}
                >
                  Lưu
                </button>
              </div>
              <h2 className="font-bold text-lg mb-3 dark:text-text-light text-text-gray-200">
                Thông tin
              </h2>
              <p className="text-sm text-text-gray-100">
                Sản phẩm: <strong>{detail?.product?.name || "-"}</strong>
              </p>
              <p className="text-sm text-text-gray-100 mt-1">
                Thuộc tính: {attributeText || "-"}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(detail?.images || []).slice(0, 3).map((img) => (
                  <Image
                    key={img.id}
                    src={img.url}
                    alt={`variant-${img.id}`}
                    className="w-full h-20 object-cover rounded border border-border-gray"
                    width={240}
                    height={80}
                    unoptimized
                  />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
