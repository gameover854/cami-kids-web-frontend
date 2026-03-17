"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/services/dashboard.services";
import { clearAuthToken } from "@/utils/auth";

const sidebarItems: SidebarItem[] = [
  { id: 1, icon: "home", label: "Tổng quan", href: "/admin", section: "main" },
  { id: 10, icon: "point_of_sale", label: "POS", href: "/admin/pos", section: "main" },
  { id: 2, icon: "category", label: "Danh mục", href: "/admin/category", section: "manage" },
  { id: 3, icon: "branding_watermark", label: "Thương hiệu", href: "/admin/brand", section: "manage" },
  { id: 4, icon: "checkroom", label: "Sản phẩm", href: "/admin/product", section: "manage" },
  { id: 5, icon: "shopping_bag", label: "Đơn hàng", href: "/admin/order", section: "manage" },
  { id: 6, icon: "grid_view", label: "Bộ sưu tập", href: "/admin/collection", section: "manage" },
  { id: 7, icon: "sell", label: "Khuyến mãi", href: "/admin/promotion", section: "manage" },
  { id: 8, icon: "group", label: "Khách hàng", href: "/admin/customer", section: "manage" },
  { id: 9, icon: "settings", label: "Cài đặt", href: "/admin/setting", section: "system" },
];

function isActivePath(pathName: string, href: string) {
  return pathName === href || pathName.startsWith(`${href}/`);
}

function getItemClass(pathName: string, href: string) {
  const active = isActivePath(pathName, href);
  if (active) {
    return "bg-background-primary text-white transition-colors border-l-[3px] border-border-primary dark:bg-background-primary dark:text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]";
  }
  return "text-text-gray-200 hover:bg-background-gray hover:text-white transition-colors group dark:text-white/80 dark:hover:bg-surface-dark dark:hover:text-white";
}

export default function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    getDashboardSummary()
      .then((res) => {
        if (!alive) return;
        setNewOrderCount(res.data.summary.pending_orders ?? 0);
      })
      .catch(() => {
        if (!alive) return;
        setNewOrderCount(null);
      });
    return () => {
      alive = false;
    };
  }, []);

  function handleLogout() {
    clearAuthToken();
    router.push("/login");
  }

  const mainItems = sidebarItems.filter((item) => item.section === "main");
  const manageItems = sidebarItems.filter((item) => item.section === "manage");
  const systemItems = sidebarItems.filter((item) => item.section === "system");

  const linkBase =
    "relative flex items-center gap-3 py-2.5 rounded-lg transition-colors group hover:shadow-[0_2px_10px_rgba(10,12,16,0.25)]";
  const linkPadding = collapsed ? "px-2 justify-center" : "px-3";

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } flex-shrink-0 border-r border-border-gray bg-background-light flex-col justify-between p-4 hidden lg:flex dark:border-border-dark dark:bg-[#101721] shadow-[8px_0_24px_rgba(15,20,27,0.08)] dark:shadow-[8px_0_24px_rgba(10,12,16,0.45)] transition-[width] duration-300 ease-out`}
    >
      <div className="flex flex-col gap-6">
        <div
          className={`flex items-start justify-between px-1 ${
            collapsed ? "flex-col gap-3 items-center" : ""
          }`}
        >
          <div className={`flex flex-col ${collapsed ? "items-center text-center" : ""}`}>
            <h1 className="text-text-gray-200 text-xl font-bold leading-normal tracking-tight dark:text-white">
              {collapsed ? "NL" : "Ngọc Linh Fashion"}
            </h1>
            {!collapsed ? (
              <p className="text-text-gray-100 text-xs font-normal dark:text-text-secondary">
                Quản trị viên
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg bg-white/70 dark:bg-[#1a2230] text-text-gray-100 dark:text-text-secondary hover:text-text-gray-200 dark:hover:text-white hover:ring-1 size-8 cursor-pointer mt-2"
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
            title={collapsed ? "Mở rộng" : "Thu gọn"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {collapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <div className="rounded-xl border border-border-gray/70 dark:border-border-dark/70 bg-white/70 dark:bg-[#1a2230] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {mainItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${linkBase} ${linkPadding} ${getItemClass(pathName, item.href)} ${
                  item.href === "/admin/pos" ? "mt-2" : ""
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                {!collapsed ? <span className="text-sm font-semibold">{item.label}</span> : null}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-border-gray/70 dark:border-border-dark/70 bg-white/70 dark:bg-[#1a2230] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {!collapsed ? (
              <div className="px-3 py-1 text-[11px] font-semibold text-text-gray-100 uppercase tracking-widest dark:text-text-secondary">
                Quản lý
              </div>
            ) : null}
            {manageItems.map((item) => {
              const active = isActivePath(pathName, item.href);
              const showNewOrderBadge =
                item.href === "/admin/order" &&
                typeof newOrderCount === "number" &&
                newOrderCount > 0;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${linkBase} ${linkPadding} ${getItemClass(pathName, item.href)}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span
                    className={`material-symbols-outlined text-[24px] transition-colors ${
                      active ? "text-primary" : "group-hover:text-primary"
                    }`}
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  {!collapsed ? <span className="text-sm font-medium">{item.label}</span> : null}
                  {showNewOrderBadge ? (
                    <span
                      className={`${
                        collapsed
                          ? "absolute -top-1 -right-1 px-1.5"
                          : "ml-auto px-2"
                      } rounded-full bg-primary/20 text-primary text-[11px] font-semibold leading-5`}
                    >
                      {newOrderCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-border-gray/70 dark:border-border-dark/70 bg-white/70 dark:bg-[#1a2230] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {!collapsed ? (
              <div className="px-3 py-1 text-[11px] font-semibold text-text-gray-100 uppercase tracking-widest dark:text-text-secondary">
                Hệ thống
              </div>
            ) : null}
            {systemItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${linkBase} ${linkPadding} ${getItemClass(pathName, item.href)}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                {!collapsed ? <span className="text-sm font-medium">{item.label}</span> : null}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="h-px bg-border-gray/70 dark:bg-border-dark/70 my-3" />
      <div
        className={`flex items-center gap-3 px-3 py-3 border border-border-gray/70 mt-auto rounded-xl bg-white/70 dark:bg-[#1a2230] dark:border-border-dark/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-8 shrink-0 bg-gray-600"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXePn0aieCBEFzXuS5f_6EaYm3tp-cFzS_P-6d4bPw4m55sIoUNDzkqgxXYDWj3wjOzKGHkCXIlcCINW3R1fQXBX1wW26YA2ZGXe-wB8yAAgYc0-96lEeR8nKas_spznggYQgjcLDXXl75RN0FjQi9tXn8Z4-8eaDBCA9Os5RReZCXkkRrHMgW1JAk9IqlZ-Wo3aB_agjy660ROANREFLOH2Km-FIw7Y_IEtdyEvhK0JFhjHBCzeV9fwXDIorh4SB2Bw6fzxVN7spK')",
          }}
        />
        {!collapsed ? (
          <div className="flex flex-col overflow-hidden">
            <p className="text-text-gray-200 text-sm font-medium truncate dark:text-white">
              Admin User
            </p>
            <p className="text-text-gray-100 text-xs truncate dark:text-text-secondary">
              admin@fashion.com
            </p>
          </div>
        ) : null}
        <button
          className={`text-text-gray-100 hover:text-text-gray-200 dark:text-text-secondary dark:hover:text-white ${
            collapsed ? "" : "ml-auto"
          }`}
          onClick={handleLogout}
          type="button"
          title="Đăng xuất"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </aside>
  );
}
