"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/notification/loading";
import { getBrand } from "@/services/brand.services";
import { getCategory } from "@/services/category.services";
import { deleteProduct, getProduct } from "@/services/product.services";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";

const ACTIVE_OPTIONS: IsActive[] = [
  { id: null, name: "Tất cả" },
  { id: 0, name: "Không hoạt động" },
  { id: 1, name: "Hoạt động" },
];

const parseIds = (value: string | null) => {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item));
};

export default function ProductPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brands>([]);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedStatusIds, setSelectedStatusIds] = useState<number[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);

  const [page, setPage] = useState(() => Math.max(1, Number(searchParams.get("page") || 1)));
  const [limit] = useState(() => Math.max(1, Number(searchParams.get("limit") || 5)));
  const [keyword, setKeyword] = useState(() => searchParams.get("keyword") || "");

  const [totalPage, setTotalPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoryRes, brandRes] = await Promise.all([getCategory(), getBrand()]);
        setCategories([{ id: null, name: "Tất cả" }, ...categoryRes.data.categories]);
        setBrands([{ id: null, name: "Tất cả" }, ...brandRes.data.brands]);

        setSelectedCategoryIds(parseIds(searchParams.get("category_id")));
        setSelectedStatusIds(parseIds(searchParams.get("is_active")));
        setSelectedBrandIds(parseIds(searchParams.get("brand_id")));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filters = useMemo<Filters>(() => {
    return {
      category_id: selectedCategoryIds.length ? selectedCategoryIds : null,
      is_active: selectedStatusIds.length ? selectedStatusIds : null,
      brand_id: selectedBrandIds.length ? selectedBrandIds : null,
      keyword: keyword.trim() || undefined,
    };
  }, [keyword, selectedBrandIds, selectedCategoryIds, selectedStatusIds]);

  const syncQueryToUrl = useCallback(() => {
    const query = new URLSearchParams();

    query.set("page", String(page));
    query.set("limit", String(limit));

    if (filters.category_id && filters.category_id.length > 0) {
      query.set("category_id", filters.category_id.join(","));
    }
    if (filters.is_active && filters.is_active.length > 0) {
      query.set("is_active", filters.is_active.join(","));
    }
    if (filters.brand_id && filters.brand_id.length > 0) {
      query.set("brand_id", filters.brand_id.join(","));
    }
    if (filters.keyword) {
      query.set("keyword", filters.keyword);
    }

    router.replace(`${pathname}?${query.toString()}`);
  }, [filters, limit, page, pathname, router]);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getProduct(page, limit, filters);
      setProducts(res.data.products);
      setTotalPage(res.data.totalPage);
      setTotalProduct(res.data.totalProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, limit, page]);

  useEffect(() => {
    if (!categories.length) return;
    syncQueryToUrl();
    fetchProducts();
  }, [categories.length, fetchProducts, syncQueryToUrl, version]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [keyword]);

  const remove = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteProduct(id);
      setVersion((current) => current + 1);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark-2 relative">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-text-light text-text-gray-200">
                Quản lý Sản phẩm
              </h1>
              <p className="text-text-gray-100 text-base">Danh sách và quản lý kho hàng</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/product/create">
                <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg border-1 border-border-gray text-text-gray-200 text-sm font-bold cursor-pointer hover:ring-1">
                  <span className="material-symbols-outlined">add</span>
                  <span>Thêm sản phẩm</span>
                </button>
              </Link>
            </div>
          </div>

          {categories.length > 0 ? (
            <ProductFilter
              categories={categories}
              isActive={ACTIVE_OPTIONS}
              brands={brands}
              selectedCategoryIds={selectedCategoryIds}
              setSelectedCategoryIds={(value) => {
                setSelectedCategoryIds(value);
                setPage(1);
              }}
              selectedStatusIds={selectedStatusIds}
              setSelectedStatusIds={(value) => {
                setSelectedStatusIds(value);
                setPage(1);
              }}
              selectedBrandIds={selectedBrandIds}
              setSelectedBrandIds={(value) => {
                setSelectedBrandIds(value);
                setPage(1);
              }}
              keyword={keyword}
              setKeyword={setKeyword}
            />
          ) : null}

          <ProductTable
            products={products}
            remove={remove}
            page={page}
            limit={limit}
            totalProduct={totalProduct}
            totalPage={totalPage}
            onChangePage={setPage}
          />
        </div>

        {isLoading ? <Loading /> : null}
      </main>
    </div>
  );
}
