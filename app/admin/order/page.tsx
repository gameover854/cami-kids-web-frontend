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
import { useEffect, useState } from "react";

type OrderListItem = {
  id: number;
  total_amount: number;
  shipping_address: string;
  status: OrderStatus;
  created_at: string;
  user: {
    id: number;
    name: string | null;
    email: string;
    phone: string | null;
  } | null;
  payment?: {
    id: number;
    amount: number;
    method: string;
    status: string;
    transaction_id: string | null;
  } | null;
};

type OrderDetailItem = OrderListItem & {
  items: Array<{
    id: number;
    quantity: number;
    price_at_purchase: number;
    variant?: {
      id: number;
      sku: string;
      product?: { id: number; name: string };
    };
  }>;
};

const statuses: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"];

export default function OrderPage() {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "ALL">("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "",
    status: "",
    transaction_id: "",
  });

  async function loadOrders() {
    try {
      setLoading(true);
      const res = await getOrders({
        page: 1,
        limit: 20,
        status: selectedStatus === "ALL" ? undefined : selectedStatus,
        sort: "desc",
      });
      setOrders(res?.data?.orders || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Không thể tải đơn hàng");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, [selectedStatus]);

  async function openDetail(id: number) {
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
    } catch (err: any) {
      setError(err?.response?.data?.message || "Không thể lấy chi tiết đơn hàng");
    } finally {
      setLoading(false);
    }
  }

  async function onUpdateStatus(id: number, status: OrderStatus) {
    try {
      setLoading(true);
      await updateOrderStatus(id, status);
      setMessage("Cập nhật trạng thái đơn hàng thành công");
      await loadOrders();
      if (selectedOrder?.id === id) {
        await openDetail(id);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Cập nhật trạng thái thất bại");
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
      setMessage("Cập nhật thanh toán thành công");
      await openDetail(selectedOrder.id);
      await loadOrders();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Cập nhật thanh toán thất bại");
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
                Quản lý Đơn hàng
              </h1>
              <p className="text-text-gray-100 text-base">
                Danh sách, chi tiết, cập nhật trạng thái và thanh toán
              </p>
            </div>
            <div className="text-sm">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | "ALL")}
                className="rounded border border-border-gray bg-transparent px-3 py-2"
              >
                <option value="ALL">Tất cả trạng thái</option>
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
                  <th className="px-4 py-3">Khách hàng</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Ngày tạo</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border-dark/70">
                    <td className="px-4 py-3 font-semibold">#{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span>{order.user?.name || "-"}</span>
                        <span className="text-xs text-text-gray-100">
                          {order.user?.email || ""}
                        </span>
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
                          Chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && orders.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-text-gray-100" colSpan={6}>
                      Không có đơn hàng
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>

          {selectedOrder ? (
            <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-bold">Order #{selectedOrder.id}</h2>
                <p>Địa chỉ giao: {selectedOrder.shipping_address}</p>
                <p>Status: {selectedOrder.status}</p>
                <p>Tổng tiền: {selectedOrder.total_amount}</p>
                <div className="pt-2">
                  <h3 className="font-semibold mb-2">Order items</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedOrder.items?.map((item) => (
                      <li key={item.id} className="border border-border-gray rounded px-3 py-2">
                        {item.variant?.product?.name || "Unknown product"} | SKU:{" "}
                        {item.variant?.sku || "-"} | Qty: {item.quantity} | Price:{" "}
                        {item.price_at_purchase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Cập nhật thanh toán</h3>
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
                    Lưu thanh toán
                  </button>
                </form>
              </div>
            </section>
          ) : null}
        </div>
      </main>
      {loading && <Loading />}
    </div>
  );
}
