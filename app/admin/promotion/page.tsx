"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import {
  createPromotion,
  deletePromotion,
  getPromotion,
  updatePromotion,
} from "@/services/promotion.services";
import { useEffect, useState } from "react";

type PromotionItem = {
  id: number;
  code: string;
  name: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
};

const emptyForm = {
  code: "",
  name: "",
  type: "PERCENTAGE" as const,
  value: 0,
  start_date: "",
  end_date: "",
  is_active: true,
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
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadPromotions() {
    try {
      setLoading(true);
      const res = await getPromotion();
      setPromotions(res?.data?.promotions || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Không thể tải khuyến mãi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPromotions();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      setLoading(true);
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
      };

      if (editingId) {
        await updatePromotion(editingId, payload);
        setMessage("Cập nhật khuyến mãi thành công");
      } else {
        await createPromotion(payload);
        setMessage("Tạo khuyến mãi thành công");
      }

      resetForm();
      await loadPromotions();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  }

  function onEdit(item: PromotionItem) {
    setEditingId(item.id);
    setForm({
      code: item.code,
      name: item.name,
      type: item.type,
      value: item.value,
      start_date: toDatetimeLocal(item.start_date),
      end_date: toDatetimeLocal(item.end_date),
      is_active: item.is_active,
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
      await loadPromotions();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Xóa khuyến mãi thất bại");
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
                Tạo/sửa/xóa mã giảm giá theo API backend
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
                placeholder="Code"
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
                    type: e.target.value as "PERCENTAGE" | "FIXED_AMOUNT",
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
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((item) => (
                  <tr key={item.id} className="border-b border-border-dark/70">
                    <td className="px-4 py-3 font-semibold">{item.code}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3">{item.value}</td>
                    <td className="px-4 py-3">{item.is_active ? "Yes" : "No"}</td>
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
                ))}
                {!loading && promotions.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={6}>
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
