"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/services/category.services";
import { useEffect, useMemo, useState } from "react";

type CategoryItem = {
  id: number;
  name: string;
  parent_id: number | null;
  children?: CategoryItem[];
};

const emptyForm = {
  name: "",
  parent_id: "",
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const flattened = useMemo(() => {
    const rows: CategoryItem[] = [];
    categories.forEach((parent) => {
      rows.push({ ...parent, children: [] });
      (parent.children || []).forEach((child) => {
        rows.push(child);
      });
    });
    return rows;
  }, [categories]);

  const parentOptions = useMemo(() => {
    return categories.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  }, [categories]);

  async function loadCategories() {
    try {
      setLoading(true);
      const res = await getCategory();
      setCategories(res?.data?.categories || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);
      const payload = {
        name: form.name.trim(),
        parent_id: form.parent_id ? Number(form.parent_id) : null,
      };

      if (!payload.name) {
        setError("Tên danh mục không được để trống");
        return;
      }

      if (editingId) {
        await updateCategory(editingId, payload);
        setMessage("Cập nhật danh mục thành công");
      } else {
        await createCategory(payload);
        setMessage("Tạo danh mục thành công");
      }

      resetForm();
      await loadCategories();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  }

  function onEdit(item: CategoryItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      parent_id: item.parent_id ? String(item.parent_id) : "",
    });
  }

  async function onDelete(id: number) {
    const confirmed = window.confirm("Bạn chắc chắn muốn xóa danh mục này?");
    if (!confirmed) return;

    setError("");
    setMessage("");
    try {
      setLoading(true);
      await deleteCategory(id);
      if (editingId === id) resetForm();
      setMessage("Xóa danh mục thành công");
      await loadCategories();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Xóa danh mục thất bại");
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
                Quản lý Danh mục
              </h1>
              <p className="text-text-gray-100 text-base">
                CRUD danh mục theo dữ liệu thực từ backend
              </p>
            </div>
            <div className="text-sm text-text-gray-100">
              Tổng: <strong>{flattened.length}</strong>
            </div>
          </div>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Tên danh mục"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <select
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                value={form.parent_id}
                onChange={(e) => setForm((prev) => ({ ...prev, parent_id: e.target.value }))}
              >
                <option value="">Danh mục gốc</option>
                {parentOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                  <th className="px-4 py-3">Cấp</th>
                  <th className="px-4 py-3">Parent</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {flattened.map((item) => {
                  const isChild = Boolean(item.parent_id);
                  return (
                    <tr key={item.id} className="border-b border-border-dark/70">
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3">
                        <span className={isChild ? "pl-4 text-text-gray-100" : "font-semibold"}>
                          {isChild ? "↳ " : ""}
                          {item.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">{isChild ? "Con" : "Gốc"}</td>
                      <td className="px-4 py-3">{item.parent_id ?? "-"}</td>
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
                {!loading && flattened.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={5}>
                      Không có dữ liệu danh mục
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
