"use client";

import Header from "@/components/layout/header";

export default function CustomerPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-xl border border-border-gray dark:bg-background-dark bg-background-light p-6">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
              Khách hàng
            </h1>
            <p className="text-text-gray-100 text-base mt-2">
              Trang này đang được hoàn thiện. Hiện tại đã có route để tránh lỗi 404.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
