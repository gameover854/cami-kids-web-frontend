"use client";

import Header from "@/components/layout/header";
import {
  createBrand,
  deleteBrand,
  getBrand,
  updateBrand,
} from "@/services/brand.services";
import { useEffect, useRef, useState } from "react";
import { sileo } from "sileo";

const emptyForm = {
  name: "",
  slug: "",
  logo: "",
  description: "",
  is_active: true,
};

export default function BrandPage() {
  const [brands, setBrands] = useState<AdminBrandItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loadingToastId = useRef<string | null>(null);

  async function loadBrands() {
    try {
      setLoading(true);
      const res = await getBrand();
      setBrands(res?.data?.brands || []);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Không thể tải thương hiệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (loading) {
      if (loadingToastId.current) {
        sileo.dismiss(loadingToastId.current);
      }
      loadingToastId.current = sileo.show({
        title: "Đang chờ",
        description: "Đang xử lý dữ liệu thương hiệu...",
        duration: null,
      });
      return;
    }
    if (loadingToastId.current) {
      sileo.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [loading]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.name.trim()) {
      setError("Tên thương hiệu không được để trống");
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      logo: form.logo.trim() || undefined,
      description: form.description.trim() || undefined,
      is_active: form.is_active,
    };

    try {
      setLoading(true);
      if (editingId) {
        await updateBrand(editingId, payload);
        setMessage("Cập nhật thương hiệu thành công");
      } else {
        await createBrand(payload);
        setMessage("Tạo thương hiệu thành công");
      }
      resetForm();
      await loadBrands();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  }

  function onEdit(item: AdminBrandItem) {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      slug: item.slug || "",
      logo: item.logo || "",
      description: item.description || "",
      is_active: item.is_active ?? true,
    });
  }

  async function onDelete(id: number) {
    const confirmed = window.confirm("Bạn chắc chắn muốn xóa thương hiệu này?");
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      setLoading(true);
      await deleteBrand(id);
      if (editingId === id) resetForm();
      setMessage("Xóa thương hiệu thành công");
      await loadBrands();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Xóa thương hiệu thất bại");
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
                Quản lý Thương hiệu
              </h1>
              <p className="text-text-gray-100 text-base">Tạo, sửa, xóa thương hiệu</p>
            </div>
            <div className="text-sm text-text-gray-100">
              Tổng: <strong>{brands.length}</strong>
            </div>
          </div>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Tên thương hiệu"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Slug (tùy chọn)"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Logo URL (tùy chọn)"
                value={form.logo}
                onChange={(e) => setForm((prev) => ({ ...prev, logo: e.target.value }))}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary md:col-span-2"
                placeholder="Mô tả (tùy chọn)"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
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
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((item) => (
                  <tr key={item.id} className="border-b border-border-dark/70">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 font-semibold">{item.name}</td>
                    <td className="px-4 py-3">{item.slug || "-"}</td>
                    <td className="px-4 py-3">
                      {item.is_active === false ? "Không hoạt động" : "Hoạt động"}
                    </td>
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
                {!loading && brands.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={5}>
                      Không có dữ liệu thương hiệu
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
