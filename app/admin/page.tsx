"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import { getDashboardSummary } from "@/services/dashboard.services";
import { formatVND } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";

const emptySummary: AdminDashboardSummary = {
  total_revenue: 0,
  total_orders: 0,
  pending_orders: 0,
  completed_orders: 0,
  new_customers: 0,
  average_order_value: 0,
  low_stock_variants: 0,
  top_products: [],
};

export default function AdminPage() {
  const [summary, setSummary] = useState<AdminDashboardSummary>(emptySummary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const res = await getDashboardSummary();
        setSummary(res?.data?.summary || emptySummary);
      } catch (err: unknown) {
        const messageText = (err as ApiError)?.response?.data?.message;
        setError(messageText || "Khong the tai du lieu dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight text-[#111618] dark:text-white">
                Tong quan
              </h2>
              <p className="text-text-gray-200 dark:text-text-gray-100 text-base">
                Dashboard tong hop du lieu that tu he thong.
              </p>
            </div>
          </header>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Tong doanh thu da thanh toan
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{formatVND(summary.total_revenue)}</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Duoc tinh tu payment status = SUCCESS
              </p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Don hang
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{summary.total_orders}</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Pending: {summary.pending_orders} | Completed: {summary.completed_orders}
              </p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Khach hang moi (thang nay)
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{summary.new_customers}</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Tu ngay dau thang den hien tai
              </p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-text-gray-200 dark:text-text-gray-100 text-sm font-medium">
                Gia tri don trung binh
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{formatVND(summary.average_order_value)}</p>
              <p className="mt-2 text-xs text-text-gray-200 dark:text-text-gray-100">
                Trung binh tren toan bo don hang
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#111618] dark:text-white">Canh bao ton kho</h3>
              <p className="text-sm text-text-gray-200 dark:text-text-gray-100 mt-1">
                So bien the sap het hang ({`<= 5`}): <strong>{summary.low_stock_variants}</strong>
              </p>
            </section>

            <section className="bg-background-light dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#111618] dark:text-white">San pham ban chay</h3>
              <ul className="text-sm text-text-gray-200 dark:text-text-gray-100 mt-2 space-y-2">
                {summary.top_products.length > 0 ? (
                  summary.top_products.map((item) => (
                    <li key={item.product_id} className="flex items-center justify-between gap-2">
                      <span>{item.product_name}</span>
                      <span>
                        Qty: {item.total_quantity} | Rev: {formatVND(item.total_revenue)}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>Chua co du lieu.</li>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
}
