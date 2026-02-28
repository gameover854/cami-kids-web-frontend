"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthToken } from "@/utils/auth";

type SidebarItem = {
  id: number;
  icon: string;
  label: string;
  href: string;
  section: "main" | "manage" | "system";
};

const sidebarItems: SidebarItem[] = [
  { id: 1, icon: "home", label: "Tổng quan", href: "/admin", section: "main" },
  { id: 2, icon: "category", label: "Danh mục", href: "/admin/category", section: "manage" },
  { id: 3, icon: "checkroom", label: "Sản phẩm", href: "/admin/product", section: "manage" },
  { id: 4, icon: "shopping_bag", label: "Đơn hàng", href: "/admin/order", section: "manage" },
  { id: 5, icon: "grid_view", label: "Bộ sưu tập", href: "/admin/collection", section: "manage" },
  { id: 6, icon: "sell", label: "Khuyến mãi", href: "/admin/promotion", section: "manage" },
  { id: 7, icon: "group", label: "Khách hàng", href: "/admin/customer", section: "manage" },
  { id: 8, icon: "settings", label: "Cài đặt", href: "/admin/setting", section: "system" },
];

function isActivePath(pathName: string, href: string) {
  return pathName === href || pathName.startsWith(`${href}/`);
}

function getItemClass(pathName: string, href: string) {
  const active = isActivePath(pathName, href);
  if (active) {
    return "bg-surface-dark text-text-primary transition-colors border-l-2 border-border-primary";
  }
  return "text-text-secondary hover:bg-surface-dark hover:text-white transition-colors group";
}

export default function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAuthToken();
    router.push("/login");
  }

  const mainItems = sidebarItems.filter((item) => item.section === "main");
  const manageItems = sidebarItems.filter((item) => item.section === "manage");
  const systemItems = sidebarItems.filter((item) => item.section === "system");

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border-dark bg-background-dark flex-col justify-between p-4 hidden lg:flex">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col px-2">
          <h1 className="text-white text-xl font-bold leading-normal tracking-tight">
            Admin Fashion
          </h1>
          <p className="text-text-secondary text-xs font-normal">Quản trị viên</p>
        </div>

        <nav className="flex flex-col gap-2">
          {mainItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${getItemClass(pathName, item.href)}`}
            >
              <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}

          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Quản lý
            </div>
            {manageItems.map((item) => {
              const active = isActivePath(pathName, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${getItemClass(pathName, item.href)}`}
                >
                  <span
                    className={`material-symbols-outlined text-[24px] transition-colors ${active ? "text-primary" : "group-hover:text-primary"}`}
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="px-3 py-1 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Hệ thống
            </div>
            {systemItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${getItemClass(pathName, item.href)}`}
              >
                <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-3 px-3 py-3 border-t border-border-dark mt-auto">
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-8 shrink-0 bg-gray-600"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXePn0aieCBEFzXuS5f_6EaYm3tp-cFzS_P-6d4bPw4m55sIoUNDzkqgxXYDWj3wjOzKGHkCXIlcCINW3R1fQXBX1wW26YA2ZGXe-wB8yAAgYc0-96lEeR8nKas_spznggYQgjcLDXXl75RN0FjQi9tXn8Z4-8eaDBCA9Os5RReZCXkkRrHMgW1JAk9IqlZ-Wo3aB_agjy660ROANREFLOH2Km-FIw7Y_IEtdyEvhK0JFhjHBCzeV9fwXDIorh4SB2Bw6fzxVN7spK')",
          }}
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-white text-sm font-medium truncate">Admin User</p>
          <p className="text-text-secondary text-xs truncate">admin@fashion.com</p>
        </div>
        <button
          className="ml-auto text-text-secondary hover:text-white"
          onClick={handleLogout}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </aside>
  );
}
