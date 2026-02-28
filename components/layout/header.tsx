"use client";

import Switch from "../button/switch";

export default function Header() {
  return (
    <header className="h-16 border-b border-border-gray bg-background-light dark:bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-white p-1">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      <div className="hidden lg:flex items-center gap-2 text-text-gray-100 dark:text-text-light text-sm">
        <span>Trang chủ</span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span>Sản phẩm</span>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10">
          <span className="text-sm text-text-gray-100 dark:text-text-light semibold">
            Chế độ tối
          </span>
          <Switch />
        </div>
        <button className="relative p-2 text-text-gray-100 hover:text-white transition-colors rounded-full hover:bg-background-gray">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark" />
        </button>
        <button className="p-2 text-text-gray-100 hover:text-white transition-colors rounded-full hover:bg-background-gray">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  );
}
