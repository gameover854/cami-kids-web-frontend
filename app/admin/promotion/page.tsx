"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import { getCollection } from "@/services/collections.services";
import {
  createPromotion,
  deletePromotion,
  getPromotion,
  updatePromotion,
} from "@/services/promotion.services";
import { useEffect, useState } from "react";

const emptyForm = {
  code: "",
  name: "",
  type: "PERCENTAGE" as AdminPromotionType,
  value: 0,
  start_date: "",
  end_date: "",
  is_active: true,
  collection_ids: [] as number[],
};

function toDatetimeLocal(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

export default function PromotionPage() {
  const [promotions, setPromotions] = useState<AdminPromotionItem[]>([]);
  const [collections, setCollections] = useState<AdminCollectionItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      const [promotionRes, collectionRes] = await Promise.all([getPromotion(), getCollection()]);
      setPromotions(promotionRes?.data?.promotions || []);
      setCollections(collectionRes?.data?.collections || []);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Không thể tải khuyến mãi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function toggleCollection(collectionId: number) {
    setForm((prev) => {
      const existed = prev.collection_ids.includes(collectionId);
      return {
        ...prev,
        collection_ids: existed
          ? prev.collection_ids.filter((id) => id !== collectionId)
          : [...prev.collection_ids, collectionId],
      };
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.code.trim() || !form.name.trim()) {
      setError("Code và tên không được để trống");
      return;
    }

    const payload = {
      code: form.code.trim(),
      name: form.name.trim(),
      type: form.type,
      value: Number(form.value),
      start_date: form.start_date ? new Date(form.start_date).toISOString() : undefined,
      end_date: form.end_date ? new Date(form.end_date).toISOString() : undefined,
      is_active: form.is_active,
      collection_ids: form.collection_ids,
    };

    try {
      setLoading(true);
      if (editingId) {
        await updatePromotion(editingId, payload);
        setMessage("Cập nhật khuyến mãi thành công");
      } else {
        await createPromotion(payload);
        setMessage("Tạo khuyến mãi thành công");
      }

      resetForm();
      await loadData();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  }

  function onEdit(item: AdminPromotionItem) {
    setEditingId(item.id);
    setForm({
      code: item.code,
      name: item.name,
      type: item.type,
      value: item.value,
      start_date: toDatetimeLocal(item.start_date),
      end_date: toDatetimeLocal(item.end_date),
      is_active: item.is_active,
      collection_ids: (item.collections || []).map((link) => link.collection_id),
    });
  }

  async function onDelete(id: number) {
    const confirmed = window.confirm("Bạn chắc chắn muốn xóa khuyến mãi này?");
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      setLoading(true);
      await deletePromotion(id);
      if (editingId === id) resetForm();
      setMessage("Xóa khuyến mãi thành công");
      await loadData();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Xóa khuyến mãi thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
                Quản lý Khuyến mãi
              </h1>
              <p className="text-text-gray-100 text-base">
                Tạo/sửa/xóa khuyến mãi và gắn cho nhiều bộ sưu tập
              </p>
            </div>
            <div className="text-sm text-text-gray-100">
              Tổng: <strong>{promotions.length}</strong>
            </div>
          </div>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Mã"
                value={form.code}
                onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
                required
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Tên khuyến mãi"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <select
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    type: e.target.value as AdminPromotionType,
                  }))
                }
              >
                <option value="PERCENTAGE">PERCENTAGE</option>
                <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
              </select>
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Giá trị"
                type="number"
                min={0}
                value={form.value}
                onChange={(e) => setForm((prev) => ({ ...prev, value: Number(e.target.value) }))}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                type="datetime-local"
                value={form.start_date}
                onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                type="datetime-local"
                value={form.end_date}
                onChange={(e) => setForm((prev) => ({ ...prev, end_date: e.target.value }))}
              />

              <div className="md:col-span-2 rounded-lg border border-border-gray p-3">
                <p className="text-sm font-semibold mb-2">Bộ sưu tập áp dụng</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {collections.map((item) => {
                    const checked = form.collection_ids.includes(item.id);
                    return (
                      <label key={item.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCollection(item.id)}
                        />
                        <span>{item.name}</span>
                      </label>
                    );
                  })}
                  {collections.length === 0 ? (
                    <p className="text-xs text-text-gray-100">Không có bộ sưu tập</p>
                  ) : null}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, is_active: e.target.checked }))
                  }
                />
                Đang hoạt động
              </label>

              <button
                className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1 disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {editingId ? "Cập nhật" : "Tạo mới"}
              </button>
              <button
                className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1 disabled:opacity-60"
                type="button"
                onClick={resetForm}
                disabled={loading}
              >
                Làm mới
              </button>
            </form>
            {message ? <p className="mt-3 text-sm text-emerald-400">{message}</p> : null}
            {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          </section>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-dark text-xs uppercase tracking-wide text-text-gray-100">
                <tr>
                  <th className="px-4 py-3">Mã</th>
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Loại</th>
                  <th className="px-4 py-3">Giá trị</th>
                  <th className="px-4 py-3">Bộ sưu tập</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((item) => {
                  const collectionNames = (item.collections || [])
                    .map((link) => link.collection?.name || `#${link.collection_id}`)
                    .join(", ");

                  return (
                    <tr key={item.id} className="border-b border-border-dark/70">
                      <td className="px-4 py-3 font-semibold">{item.code}</td>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.type}</td>
                      <td className="px-4 py-3">{item.value}</td>
                      <td className="px-4 py-3">{collectionNames || "-"}</td>
                      <td className="px-4 py-3">{item.is_active ? "Có" : "Không"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="rounded border border-border-gray px-3 py-1 hover:ring-1"
                            onClick={() => onEdit(item)}
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            className="rounded border border-red-500/50 px-3 py-1 text-red-400 hover:bg-red-500/10"
                            onClick={() => onDelete(item.id)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!loading && promotions.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={7}>
                      Không có dữ liệu khuyến mãi
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>
        </div>
      </main>
      {loading && <Loading />}
    </div>
  );
}
