"use client";

import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteProduct, getProduct } from "@/services/product.services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategory } from "@/services/category.services";
import Loading from "@/components/notification/loading";

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
    isActive[0]
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
          filters
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("--->Error<---", error);
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
      console.log("--->Error Delete Product<---", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col  h-full bg-background-dark relative">
      {/* <!-- Top Navbar --> */}
      <header className="h-16 border-b border-border-dark bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-white p-1">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[#9db2b9] text-sm">
          <span>Trang chủ</span>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-white font-medium">Sản phẩm</span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:flex relative">
            <input
              className="bg-surface-dark border-none rounded-full h-9 pl-10 pr-4 text-sm text-white placeholder-[#9db2b9] focus:ring-1 focus:ring-primary w-64 transition-all focus:w-80"
              placeholder="Tìm nhanh..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-2 text-[#9db2b9] text-[20px]">
              search
            </span>
          </div>
          <button className="relative p-2 text-[#9db2b9] hover:text-white transition-colors rounded-full hover:bg-surface-dark">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
          </button>
          <button className="p-2 text-[#9db2b9] hover:text-white transition-colors rounded-full hover:bg-surface-dark">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>
      {/* <!-- Page Content Scrollable --> */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* <!-- Page Heading & Actions --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Quản lý Sản phẩm
              </h1>
              <p className="text-[#9db2b9] text-base">
                Danh sách và quản lý kho hàng thời trang trẻ em
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-surface-dark text-white text-sm font-bold border border-border-dark hover:bg-[#233339] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">
                  file_upload
                </span>
                <span>Xuất Excel</span>
              </button>
              <Link href="/admin/product/create">
                <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg bg-primary text-background-dark text-sm font-bold hover:bg-[#3ec4f1] transition-all shadow-lg shadow-primary/20 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>
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
