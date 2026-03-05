"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "@/services/customer.services";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

export default function CustomerPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<AdminCustomerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  async function loadCustomers(currentPage = page, currentKeyword = keyword) {
    try {
      setLoading(true);
      const res = await getCustomer(currentPage, limit, currentKeyword);
      setCustomers(res?.data?.customers || []);
      setTotalCustomer(res?.data?.totalCustomer || 0);
      setTotalPage(res?.data?.totalPage || 1);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Khong the tai danh sach khach hang");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, [page, keyword]);

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
      if (editingId) {
        await updateCustomer(editingId, {
          name: form.name.trim(),
          phone: form.phone.trim() || null,
        });
        setMessage("Cap nhat khach hang thanh cong");
      } else {
        if (!form.email.trim() || !form.password.trim()) {
          setError("Email va mat khau la bat buoc");
          return;
        }
        await createCustomer({
          name: form.name.trim() || undefined,
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          password: form.password,
        });
        setMessage("Tao khach hang thanh cong");
      }
      resetForm();
      await loadCustomers(1, keyword);
      setPage(1);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Thao tac that bai");
    } finally {
      setLoading(false);
    }
  }

  function onEdit(item: AdminCustomerItem) {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      email: item.email,
      phone: item.phone || "",
      password: "",
    });
  }

  async function onDelete(id: number) {
    const confirmed = window.confirm("Ban chac chan muon xoa khach hang nay?");
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      setLoading(true);
      await deleteCustomer(id);
      setMessage("Xoa khach hang thanh cong");
      await loadCustomers(page, keyword);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Xoa khach hang that bai");
    } finally {
      setLoading(false);
    }
  }

  const visibleCustomers = useMemo(() => {
    const filtered = customers.filter((item) => {
      const isActive = (item._count?.orders || 0) > 0;
      if (statusFilter === "active") return isActive;
      if (statusFilter === "inactive") return !isActive;
      return true;
    });

    return filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return sortBy === "newest" ? bTime - aTime : aTime - bTime;
    });
  }, [customers, sortBy, statusFilter]);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
                Quan ly Khach hang
              </h1>
              <p className="text-text-gray-100 text-base">
                Danh sach va thong tin khach hang thuc te tu API
              </p>
            </div>
            <div className="text-sm text-text-gray-100">
              Tong: <strong>{totalCustomer}</strong>
            </div>
          </div>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold bg-primary text-background-dark hover:opacity-90"
                onClick={() => {
                  resetForm();
                  setMessage("");
                  setError("");
                }}
              >
                Add Customer
              </button>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ten khach hang"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                disabled={Boolean(editingId)}
                required={!editingId}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="So dien thoai"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              />
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder={editingId ? "Mat khau khong doi o che do sua" : "Mat khau"}
                type="password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                disabled={Boolean(editingId)}
                required={!editingId}
              />
              <div className="flex gap-2">
                <button
                  className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1 disabled:opacity-60"
                  type="submit"
                  disabled={loading}
                >
                  {editingId ? "Cap nhat" : "Tao moi"}
                </button>
                <button
                  className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1 disabled:opacity-60"
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Lam moi
                </button>
              </div>
            </form>

            <div className="mt-3 flex gap-2">
              <input
                className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary w-full md:w-96"
                placeholder="Tim theo ten, email, so dien thoai..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1"
                type="button"
                onClick={() => {
                  setPage(1);
                  setKeyword(searchInput.trim());
                }}
              >
                Tim
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1"
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev === "all" ? "active" : prev === "active" ? "inactive" : "all",
                  )
                }
              >
                Status: {statusFilter}
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1"
                onClick={() =>
                  setSortBy((prev) => (prev === "newest" ? "oldest" : "newest"))
                }
              >
                Sort: {sortBy}
              </button>
            </div>

            {message ? <p className="mt-3 text-sm text-emerald-400">{message}</p> : null}
            {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          </section>

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-dark text-xs uppercase tracking-wide text-text-gray-100">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Total Orders</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Hanh dong</th>
                </tr>
              </thead>
              <tbody>
                {visibleCustomers.map((item) => (
                  <tr key={item.id} className="border-b border-border-dark/70">
                    <td className="px-4 py-3 font-semibold">{item.name || "-"}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone || "-"}</td>
                    <td className="px-4 py-3">{item._count?.orders || 0}</td>
                    <td className="px-4 py-3">
                      {(item._count?.orders || 0) > 0 ? "Active" : "Inactive"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="rounded border border-border-gray px-3 py-1 hover:ring-1"
                          onClick={() => onEdit(item)}
                        >
                          Sua
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-500/50 px-3 py-1 text-red-400 hover:bg-red-500/10"
                          onClick={() => onDelete(item.id)}
                        >
                          Xoa
                        </button>
                        <button
                          type="button"
                          className="rounded border border-border-gray px-3 py-1 hover:ring-1"
                          onClick={() => router.push(`/admin/order?customer_id=${item.id}`)}
                        >
                          Orders
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && visibleCustomers.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={6}>
                      Khong co du lieu khach hang
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <div className="flex items-center justify-end gap-2 p-3 border-t border-border-dark">
              <button
                type="button"
                className="rounded border border-border-gray px-3 py-1 disabled:opacity-50"
                disabled={page <= 1 || loading}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Truoc
              </button>
              <span className="text-sm text-text-gray-100">
                {page} / {Math.max(totalPage, 1)}
              </span>
              <button
                type="button"
                className="rounded border border-border-gray px-3 py-1 disabled:opacity-50"
                disabled={page >= totalPage || loading}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Sau
              </button>
            </div>
          </section>
        </div>
      </main>
      {loading && <Loading />}
    </div>
  );
}
