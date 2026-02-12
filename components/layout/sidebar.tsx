"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Switch from "../button/switch";
export default function Sidebar() {
  const pathName = usePathname();
  const sideBarItems = [
    {
      id: 1,
      icon: "Dashboard",
      label: "Tổng quan",
      href: "/admin",
      isActive: isActiveSidebar("/admin", pathName),
    },
    {
      id: 2,
      icon: "category",
      label: "Danh mục",
      href: "/admin/category",
      isActive: isActiveSidebar("/admin/category", pathName),
    },
    {
      id: 3,
      icon: "checkroom",
      label: "Sản phẩm",
      href: "/admin/product",
      keys: ["product", "product/create"],
      isActive: isActiveSidebar("/admin/product", pathName),
    },
    {
      id: 4,
      icon: "shopping_bag",
      label: "Đơn hàng",
      href: "/admin/order",
      isActive: isActiveSidebar("/admin/order", pathName),
    },
    {
      id: 5,
      icon: "group",
      label: "Khách hàng",
      href: "/admin/customer",
      isActive: isActiveSidebar("/admin/customer", pathName),
    },
    {
      id: 6,
      icon: "settings",
      label: "Cài đặt",
      href: "/admin/setting",
      isActive: isActiveSidebar("/admin/setting", pathName),
    }
  ];

  function isActiveSidebar(href: string, pathName: string, index: number = 0) {
    return pathName.includes(href)
      ? "bg-primary/10 text-text-primary bg-background-primary/10 transition-colors border-primary/20 border"
      : "dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";
  }

  return (
    <aside className="w-64 bg-background-light dark:bg-background-dark border-r border-gray-200 dark:border-gray-800 flex flex-col hidden lg:flex flex-shrink-0 z-20">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-primary"
            data-alt="Avatar of the admin user with a friendly smile"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDicWbhXKnflazY1kLywThfxyVR3detMspCumAAdgVOloQ7aov-J8pmBQxL7fcwnR_P6Ap9eN06JP6uYGSjLtA4btA_OY9bIfVIW5ThDVJkVqMLgauWelxU0LgXBCHADi43uxWun8z494mKMz33jc0svCvK_10tOy_f2D7WYjZdykWPGWBXZbSqBnQ9pcy1DVaabqV1m3XHxZvYLFOfv1yTI6MrwnCxHoFsZVcPnJw7V6sPmOUxXXyvoZXEPiZ3KxHyltyo43PGMgtM')`,
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-tight">Admin Kids</h1>
            <p className="text-text-gray-100 text-xs font-normal">
              Quản trị viên
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {sideBarItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <span
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${item.isActive}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
