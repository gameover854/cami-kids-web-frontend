"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import { getSetting, updateSetting } from "@/services/setting.services";
import { useEffect, useState } from "react";
const defaultForm: AdminSettingForm = {
  store_name: "",
  support_email: "",
  support_phone: "",
  timezone: "Asia/Ho_Chi_Minh",
  auto_cancel_hours: 24,
  low_stock_threshold: 5,
  allow_guest_checkout: false,
};

export default function SettingPage() {
  const [form, setForm] = useState<AdminSettingForm>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadSettings() {
    try {
      setLoading(true);
      const res = await getSetting();
      setForm({ ...defaultForm, ...(res?.data?.settings || {}) });
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Không thể tải cấu hình");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      setLoading(true);
      await updateSetting({
        ...form,
        auto_cancel_hours: Number(form.auto_cancel_hours),
        low_stock_threshold: Number(form.low_stock_threshold),
      });
      setMessage("Lưu cấu hình thành công");
      await loadSettings();
    } catch (err: unknown) {
      const messageText = (err as ApiError)?.response?.data?.message;
      setError(messageText || "Lưu cấu hình thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
              Cấu hình Hệ thống
            </h1>
            <p className="text-text-gray-100 text-base mt-1">
              Quản lý setting thực tế với API /settings
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
              <h2 className="font-bold text-lg mb-3 dark:text-text-light text-text-gray-200">
                Hồ sơ cửa hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Tên cửa hàng"
                  value={form.store_name}
                  onChange={(e) => setForm((prev) => ({ ...prev, store_name: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Email hỗ trợ"
                  type="email"
                  value={form.support_email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, support_email: e.target.value }))
                  }
                />
                <input
                  className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="SĐT hỗ trợ"
                  value={form.support_phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, support_phone: e.target.value }))
                  }
                />
                <input
                  className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Múi giờ"
                  value={form.timezone}
                  onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
                />
              </div>
            </section>

            <section className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-4">
              <h2 className="font-bold text-lg mb-3 dark:text-text-light text-text-gray-200">
                Quy tắc đơn hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Giờ tự hủy"
                  type="number"
                  min={0}
                  value={form.auto_cancel_hours}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      auto_cancel_hours: Number(e.target.value),
                    }))
                  }
                />
                <input
                  className="rounded-lg border border-border-gray bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Ngưỡng tồn kho thấp"
                  type="number"
                  min={0}
                  value={form.low_stock_threshold}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      low_stock_threshold: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <label className="mt-4 inline-flex items-center gap-2 text-sm text-text-gray-100">
                <input
                  type="checkbox"
                  checked={form.allow_guest_checkout}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      allow_guest_checkout: e.target.checked,
                    }))
                  }
                />
                Cho phép khách vãng lai thanh toán
              </label>
            </section>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold border border-border-gray hover:ring-1"
                onClick={() => {
                  setForm(defaultForm);
                  setMessage("");
                  setError("");
                }}
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 text-sm font-semibold bg-primary text-background-dark hover:opacity-90"
                disabled={loading}
              >
                Lưu cài đặt
              </button>
            </div>
            {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
          </form>
        </div>
      </main>
      {loading && <Loading />}
    </div>
  );
}
