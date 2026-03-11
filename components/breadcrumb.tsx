 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const LABEL_MAP: Record<string, string> = {
  admin: "Trang chủ",
  product: "Sản phẩm",
  create: "Tạo mới",
  brand: "Thương hiệu",
  category: "Danh mục",
  collection: "Bộ sưu tập",
  promotion: "Khuyến mãi",
  customer: "Khách hàng",
  order: "Đơn hàng",
  setting: "Cài đặt",
  variant: "Biến thể",
};

function buildLabel(segment: string, prevSegment?: string) {
  if (LABEL_MAP[segment]) return LABEL_MAP[segment];
  if (prevSegment === "product") return `Sản phẩm #${segment}`;
  if (prevSegment === "order") return `Đơn hàng #${segment}`;
  if (prevSegment === "variant") return `Biến thể #${segment}`;
  return segment;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const items = useMemo<BreadcrumbItem[]>(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return [];
    if (segments[0] !== "admin") return [];

    const list: BreadcrumbItem[] = [{ label: "Trang chủ", href: "/admin" }];

    let currentPath = "/admin";
    for (let i = 1; i < segments.length; i += 1) {
      const segment = segments[i];
      currentPath = `${currentPath}/${segment}`;
      const label = buildLabel(segment, segments[i - 1]);
      list.push({ label, href: currentPath });
    }

    return list;
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <div className="hidden lg:flex items-center gap-2 text-text-gray-100 dark:text-text-light text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link className="hover:text-white transition-colors" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {!isLast ? (
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
