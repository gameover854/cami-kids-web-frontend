"use client";

import Switch from "../button/switch";
import Breadcrumb from "../breadcrumb";

export default function Header() {
  return (
    <header className="h-16 border-b border-border-gray bg-background-light dark:bg-[#151b24]/90 dark:border-border-dark/70 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20 shadow-[0_4px_16px_rgba(15,20,27,0.08)] dark:shadow-[0_6px_18px_rgba(6,8,12,0.55)]">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-white p-1" type="button">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      <Breadcrumb />
      <div className="flex items-center gap-4 ml-auto">
        <div className="h-6 w-px bg-border-gray/70 dark:bg-border-dark/70" />
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 border border-border-gray/60 dark:border-border-dark/70 dark:bg-[#1f2a3a]">
          <span className="text-sm text-text-gray-100 dark:text-text-light semibold">
            Chế độ tối
          </span>
          <Switch />
        </div>
        <button className="relative p-2 text-text-gray-100 hover:text-white transition-colors rounded-full hover:bg-background-gray dark:hover:bg-surface-dark" type="button">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark" />
        </button>
        <button className="p-2 text-text-gray-100 hover:text-white transition-colors rounded-full hover:bg-background-gray dark:hover:bg-surface-dark" type="button">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  );
}

