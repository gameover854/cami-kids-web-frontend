"use client";

import Header from "@/components/layout/header";
import {
  createCollection,
  deleteCollection,
  getCollection,
  updateCollection,
} from "@/services/collections.services";
import { getPromotion } from "@/services/promotion.services";
import { useEffect, useMemo, useRef, useState } from "react";
import { sileo } from "sileo";

const emptyForm = {
  name: "",
  slug: "",
  is_active: true,
};

export default function CollectionPage() {
  const [collections, setCollections] = useState<AdminCollectionItem[]>([]);
  const [promotions, setPromotions] = useState<AdminPromotionItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const loadingToastId = useRef<string | null>(null);

  const promotionsByCollection = useMemo(() => {
    const map = new Map<number, string[]>();

    promotions.forEach((promotion) => {
      (promotion.collections || []).forEach((link) => {
        const list = map.get(link.collection_id) || [];
        list.push(`${promotion.code} (${promotion.name})`);
        map.set(link.collection_id, list);
      });
    });

    return map;
  }, [promotions]);

  async function loadData() {
    try {
      setLoading(true);
      const [collectionRes, promotionRes] = await Promise.all([
        getCollection(),
        getPromotion(),
      ]);
      setCollections(collectionRes?.data?.collections || []);
      setPromotions(promotionRes?.data?.promotions || []);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Không thể tải bộ sưu tập");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading) {
      if (loadingToastId.current) {
        sileo.dismiss(loadingToastId.current);
      }
      loadingToastId.current = sileo.show({
        title: "Đang chờ",
        description: "Đang xử lý bộ sưu tập...",
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

    if (!form.name.trim() || !form.slug.trim()) {
      setError("Tên và slug không được để trống");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await updateCollection(editingId, {
          name: form.name.trim(),
          slug: form.slug.trim(),
          is_active: form.is_active,
        });
        setMessage("Cập nhật bộ sưu tập thành công");
      } else {
        await createCollection({
          name: form.name.trim(),
          slug: form.slug.trim(),
          is_active: form.is_active,
        });
        setMessage("Tạo bộ sưu tập thành công");
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

  function onEdit(item: AdminCollectionItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      is_active: item.is_active,
    });
  }

  async function onDelete(id: number) {
    const confirmed = window.confirm("Bạn chắc chắn muốn xóa bộ sưu tập này?");
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      setLoading(true);
      await deleteCollection(id);
      if (editingId === id) resetForm();
      setMessage("Xóa bộ sưu tập thành công");
      await loadData();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Xóa bộ sưu tập thất bại");
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
                Quản lý Bộ sưu tập
              </h1>
              <p className="text-text-gray-100 text-base">
                Quản lý bộ sưu tập và các khuyến mãi đang áp dụng
              </p>
            </div>
            <div className="text-sm text-text-gray-100">
              Tổng: <strong>{collections.length}</strong>
            </div>
          </div>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Tên bộ sưu tập"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                required
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
                  <th className="px-4 py-3">Khuyến mãi áp dụng</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((item) => {
                  const promotionNames = promotionsByCollection.get(item.id) || [];

                  return (
                    <tr key={item.id} className="border-b border-border-dark/70">
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3 font-semibold">{item.name}</td>
                      <td className="px-4 py-3">{item.slug}</td>
                      <td className="px-4 py-3">
                        {item.is_active ? "Hoạt động" : "Không hoạt động"}
                      </td>
                      <td className="px-4 py-3">
                        {promotionNames.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {promotionNames.map((promotionText) => (
                              <span
                                key={`${item.id}-${promotionText}`}
                                className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-text-light"
                              >
                                {promotionText}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-text-gray-100">Chưa có</span>
                        )}
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
                  );
                })}
                {!loading && collections.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={6}>
                      Không có dữ liệu bộ sưu tập
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

