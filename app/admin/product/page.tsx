"use client";

import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteProduct, getProduct } from "@/services/product.services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategory } from "@/services/category.services";
import Loading from "@/components/notification/loading";
import Header from "@/components/layout/header";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const isActive = [
    { id: null, name: "Tất cả" },
    { id: 0, name: "Không hoạt động" },
    { id: 1, name: "Hoạt động" },
  ];
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [selectedIsActive, setSelectedIsActive] = useState<IsActive>(
    isActive[0],
  );
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentsParams = new URLSearchParams(searchParams.toString());
  const params = Object.fromEntries(searchParams.entries());
  const { category_id, is_active, pageParams, limitParams } = params;
  const [version, setVersion] = useState(0);
  // -------1. Fetch Category--------
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getCategory();

      const list = [{ id: null, name: "Tất cả" }, ...res.data.categories];

      setCategories(list);
      setIsReady(true);
    };

    fetchCategory();
  }, []);

  // -------2. Cập nhật State Cho UI khi lần đầu vào trang có kèm URL params--------
  useEffect(() => {
    if (!categories) return;

    const matchedCategory =
      categories.find((item) => item.id === Number(category_id)) ??
      categories[0];
    const matchedIsActive =
      isActive.find((item) => item.id === Number(is_active)) ?? isActive[0];

    setSelectedCategory(matchedCategory);
    setSelectedIsActive(matchedIsActive);
  }, [categories]);

  // -------3. Cập nhật State cho filter khi có cập nhật Trên UI--------
  const filters = useMemo(() => {
    return {
      category_id: selectedCategory ? selectedCategory.id : null,
      is_active: selectedIsActive ? selectedIsActive.id : null,
    };
  }, [selectedCategory, selectedIsActive]);

  // -------4. Fetch Product--------
  useEffect(() => {
    if (!isReady) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await getProduct(
          Number(pageParams ?? 1),
          Number(limitParams ?? 5),
          filters,
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();

    if (filters.category_id) {
      currentsParams.set("category_id", String(filters.category_id));
    } else {
      currentsParams.delete("category_id");
    }

    if (filters.is_active || filters.is_active === 0) {
      currentsParams.set("is_active", String(filters.is_active));
    } else {
      currentsParams.delete("is_active");
    }

    const queryString = currentsParams.toString();
    router.replace(`${pathName}?${queryString}`);
  }, [filters, version]);

  async function remove(id: number) {
    try {
      setIsLoading(true);
      await deleteProduct(id);
      setVersion(version + 1);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col  h-full bg-background-light dark:bg-background-dark-2 relative">
      {/* <!-- Top Navbar --> */}
      <Header />
      {/* <!-- Page Content Scrollable --> */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* <!-- Page Heading & Actions --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
                Quản lý Sản phẩm
              </h1>
              <p className="text-text-gray-100 text-base">
                Danh sách và quản lý kho hàng
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg border-1 border-border-gray text-text-gray-200 text-sm font-bold cursor-pointer hover:ring-1">
                <span className="material-symbols-outlined">file_upload</span>
                <span>Xuất Excel</span>
              </button>
              <Link href="/admin/product/create">
                <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg border-1 border-border-gray text-text-gray-200 text-sm font-bold cursor-pointer hover:ring-1">
                  <span className="material-symbols-outlined">add</span>
                  <span>Thêm sản phẩm</span>
                </button>
              </Link>
            </div>
          </div>

          {categories.length ? (
            <ProductFilter
              categories={categories}
              isActive={isActive}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedIsActive={selectedIsActive}
              setSelectedIsActive={setSelectedIsActive}
            />
          ) : (
            ""
          )}
          <ProductTable products={products} remove={remove} />
        </div>

        {isLoading && <Loading />}
      </main>
    </div>
  );
}
