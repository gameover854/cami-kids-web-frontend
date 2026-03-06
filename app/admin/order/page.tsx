"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import {
  OrderStatus,
  getOrderById,
  getOrders,
  updateOrderPayment,
  updateOrderStatus,
} from "@/services/order.services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const statuses: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"];

const parsePositiveNumber = (value: string | null) => {
  if (!value) return null;
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : null;
};

export default function OrderPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const customerId = useMemo(
    () => parsePositiveNumber(searchParams.get("customer_id")),
    [searchParams],
  );

  const [orders, setOrders] = useState<AdminOrderListItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "ALL">("ALL");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderDetailItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "",
    status: "",
    transaction_id: "",
  });

  const syncQuery = useCallback(() => {
    const query = new URLSearchParams();
    query.set("page", String(page));
    query.set("limit", String(limit));
    if (selectedStatus !== "ALL") query.set("status", selectedStatus);
    if (customerId) query.set("customer_id", String(customerId));
    router.replace(`${pathname}?${query.toString()}`);
  }, [customerId, limit, page, pathname, router, selectedStatus]);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOrders({
        page,
        limit,
        status: selectedStatus === "ALL" ? undefined : selectedStatus,
        user_id: customerId ?? undefined,
        sort: "desc",
      });
      setOrders(res?.data?.orders || []);
      setTotalOrder(res?.data?.totalOrder || 0);
      setTotalPage(res?.data?.totalPage || 1);
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Khong the tai don hang");
    } finally {
      setLoading(false);
    }
  }, [customerId, limit, page, selectedStatus]);

  useEffect(() => {
    syncQuery();
    loadOrders();
  }, [loadOrders, syncQuery]);

  useEffect(() => {
    setPage(1);
  }, [selectedStatus, customerId]);

  const openDetail = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const res = await getOrderById(id);
      const order = res?.data?.order || null;
      setSelectedOrder(order);
      setPaymentForm({
        amount: order?.payment?.amount ? String(order.payment.amount) : "",
        method: order?.payment?.method || "",
        status: order?.payment?.status || "",
        transaction_id: order?.payment?.transaction_id || "",
      });
      setMessage("");
      setError("");
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Khong the lay chi tiet don hang");
    } finally {
      setLoading(false);
    }
  }, []);

  async function onUpdateStatus(id: number, status: OrderStatus) {
    try {
      setLoading(true);
      await updateOrderStatus(id, status);
      setMessage("Cap nhat trang thai don hang thanh cong");
      await loadOrders();
      if (selectedOrder?.id === id) {
        await openDetail(id);
      }
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Cap nhat trang thai that bai");
    } finally {
      setLoading(false);
    }
  }

  async function onUpdatePayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedOrder) return;

    const payload: {
      amount?: number;
      method?: string;
      status?: string;
      transaction_id?: string | null;
    } = {};

    if (paymentForm.amount !== "") payload.amount = Number(paymentForm.amount);
    if (paymentForm.method.trim()) payload.method = paymentForm.method.trim();
    if (paymentForm.status.trim()) payload.status = paymentForm.status.trim();
    if (paymentForm.transaction_id !== "") payload.transaction_id = paymentForm.transaction_id;

    try {
      setLoading(true);
      await updateOrderPayment(selectedOrder.id, payload);
      setMessage("Cap nhat thanh toan thanh cong");
      await openDetail(selectedOrder.id);
      await loadOrders();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Cap nhat thanh toan that bai");
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
                Quan ly Don hang
              </h1>
              <p className="text-text-gray-100 text-base">
                Luong status/payment that, co filter theo khach hang va phan trang
              </p>
            </div>
            <div className="flex items-center gap-2">
              {customerId ? (
                <span className="text-xs px-2 py-1 rounded border border-border-gray">
                  customer_id={customerId}
                </span>
              ) : null}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | "ALL")}
                className="rounded border border-border-gray bg-transparent px-3 py-2"
              >
                <option value="ALL">Tat ca trang thai</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-dark text-xs uppercase tracking-wide text-text-gray-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Khach hang</th>
                  <th className="px-4 py-3">Tong tien</th>
                  <th className="px-4 py-3">Trang thai</th>
                  <th className="px-4 py-3">Ngay tao</th>
                  <th className="px-4 py-3 text-right">Hanh dong</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border-dark/70">
                    <td className="px-4 py-3 font-semibold">#{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span>{order.user?.name || "-"}</span>
                        <span className="text-xs text-text-gray-100">{order.user?.email || ""}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{order.total_amount}</td>
                    <td className="px-4 py-3">
                      <select
                        className="rounded border border-border-gray bg-transparent px-2 py-1"
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                        disabled={loading}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">{new Date(order.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="rounded border border-border-gray px-3 py-1 hover:ring-1"
                          onClick={() => openDetail(order.id)}
                        >
                          Chi tiet
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && orders.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={6}>
                      Khong co don hang
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <div className="flex items-center justify-between gap-2 p-3 border-t border-border-dark">
              <span className="text-sm text-text-gray-100">Tong don: {totalOrder}</span>
              <div className="flex items-center gap-2">
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
            </div>
          </section>

          {selectedOrder ? (
            <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-bold">Order #{selectedOrder.id}</h2>
                <p>Dia chi giao: {selectedOrder.shipping_address}</p>
                <p>Trang thai: {selectedOrder.status}</p>
                <p>Tong tien: {selectedOrder.total_amount}</p>
                <div className="pt-2">
                  <h3 className="font-semibold mb-2">San pham trong don</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedOrder.items?.map((item) => (
                      <li key={item.id} className="border border-border-gray rounded px-3 py-2">
                        {item.variant?.product?.name || "Unknown product"} | SKU: {item.variant?.sku || "-"} | Qty: {item.quantity} | Price: {item.price_at_purchase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Cap nhat thanh toan</h3>
                <form onSubmit={onUpdatePayment} className="space-y-3">
                  <input
                    className="w-full rounded border border-border-gray bg-transparent px-3 py-2 text-sm"
                    placeholder="Amount"
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))
                    }
                  />
                  <input
                    className="w-full rounded border border-border-gray bg-transparent px-3 py-2 text-sm"
                    placeholder="Method (COD, BANK_TRANSFER...)"
                    value={paymentForm.method}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({ ...prev, method: e.target.value }))
                    }
                  />
                  <input
                    className="w-full rounded border border-border-gray bg-transparent px-3 py-2 text-sm"
                    placeholder="Payment status"
                    value={paymentForm.status}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                  />
                  <input
                    className="w-full rounded border border-border-gray bg-transparent px-3 py-2 text-sm"
                    placeholder="Transaction id"
                    value={paymentForm.transaction_id}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        transaction_id: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="submit"
                    className="rounded border border-border-gray px-4 py-2 text-sm font-semibold hover:ring-1 disabled:opacity-60"
                    disabled={loading}
                  >
                    Luu thanh toan
                  </button>
                </form>
              </div>
            </section>
          ) : null}
        </div>
      </main>
      {loading ? <Loading /> : null}
    </div>
  );
}
